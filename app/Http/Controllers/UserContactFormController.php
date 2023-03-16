<?php

namespace App\Http\Controllers;
use App\Models\UserContactForm;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use \Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Notification;
use App\Notifications\WelcomUser;
use App\Notifications\AdminNewContact;
use Illuminate\Validation\Rule;

class UserContactFormController extends Controller
{

    public function index(Request $request) {
        $response = [
            'success' => false,
            'message' => __('general_fail'),
            'data' => [],
        ];
        try {
            $limit  = isset($request->limit) ? $request->limit : config('constants.pagination.limit');
            $field  = isset($request->sort ) && ! empty($request->sort) && in_array($request->sort, array("first_name","last_name", "full_name", "email", "created_at")) ? $request->sort : 'id';
            $dir = isset($request->dir) && ! empty($request->dir) && in_array($request->dir, array("asc", "desc")) ? $request->dir : 'desc';
            $search = isset($request->search) ? $request->search : '';
            $teacherStatus = isset($request->status) ?  explode(',',$request->status) : $this->status;

            $contact = UserContactForm::whereIn('status', $teacherStatus)->where('deleted_at', null);

            if (!empty($search)) {
                $contact->where(function ($query) use ($search) {
                    $query->where('first_name', 'like', '%' . $search . '%')
                        ->orWhere('last_name', 'like', '%' . $search . '%')
                        ->orWhere('full_name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%')
                        ->orWhere('message', 'like', '%' . $search . '%');
                });
            }

            $contact = $contact->orderBy($field, $dir)->paginate($limit);
            $contact = $contact->toArray();
            
            if (count($contact['data']) > 0) {
                foreach ($contact['data'] as $key => $value) {
                    $contact['data'][$key]['created_at'] = Carbon::parse($value['created_at'])->format('d-m-Y H:i A');
                    $contact['data'][$key]['id'] = encryptString($value['id']);
                }
            }

            $response['success'] = true;
            $response['message'] = (count($contact['data']) > 0) ? __('fetch', ['Contact']) : __('no_record');
            $response['data'] = $contact;

            return response($response, 200);
        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
            return response($response, 200);
        }
    }

    public function get($cid) {
        $response = [
            'success' => false,
            'message' => __('general_fail'),
            'data' => [],
        ];
        try {
            $contactId = decryptString($cid);
            $contact = UserContactForm::whereId($contactId)->where('deleted_at', null)->select('id', 'first_name', 'last_name', 'email', 'message', 'contact_number')->first();
            if (empty($contact)) {
                $response['message'] = __('no_record');
                return response($response, 200);
            }
            $contact = $contact->toArray();
            $contact['id'] = encryptString($contact['id']);
            $response['success'] = true;
            $response['message'] = __('fetch', ['Contact']);
            $response['data'] = $contact;
            return response($response, 200);   
        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
            return response($response, 200);
        }
    }


    public function uniqueEmail(Request $request) {
        $response = [
            'success' => false,
            'message' => __('general_fail'),
            'data' => [],
        ];
        try {
            $rule = Rule::unique('user_contact_forms')->where(function ($query) {
                $query->where([
                    ['deleted_at', '=', null],
                    ['status', '=', config('constants.generalstatus.active')]
                ]);
            });
            if ($request->id) {
                $contactId = decryptString($request->id);
                $rule->ignore($contactId);
            }
            $rules = [
                'email' => ['required', 'email', $rule],
            ];
            $customMessages = [
                'email.required' => __('required',['Email']),
                'email.email' => __('email',['Email']),
                'email.unique' => __('unique',['Email']),
            ];
            $validator = Validator::make($request->all(), $rules, $customMessages);
            if ($validator->fails()) {
                $response['message'] = $validator->errors()->first();
                return response($response, 200);
            }
            $response['success'] = true;
            $response['message'] = $request->id ? 'Email is valid' : 'Email is available';
            return response($response, 200);
        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
            return response($response, 200);
        }
    }

    public function create(Request $request) {
        return $this->createOrUpdateContact($request);
    }

    public function update(Request $request, $id) {
        return $this->createOrUpdateContact($request, $id);
    }

    public function updateStatus($id) {
        $response = [
            'success' => false,
            'message' => __('general_fail'),
            'data' => [],
        ];
        try {
            $contactId = decryptString($id);
            $contact = UserContactForm::whereId($contactId)->where('deleted_at', null)->first();
            if (!$contact) {
                $response['message'] = __('not_found', ['Contact']);
                return response($response, 200);
            }
            $contact->status = ($contact->status == config('constants.generalstatus.active')) ? config('constants.generalstatus.inactive') : config('constants.generalstatus.active');
            if (!$contact->save()) {
                $response['message'] = __('general_fail');
                return response($response, 200);
            }
            $response['success'] = true;
            $response['message'] = __($contact->status == config('constants.generalstatus.inactive') ? 'deactivated' : 'activated', ['Contact']);;
            return response($response, 200);
        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
            return response($response, 200);
        }
    }

    public function deleteContact($id) {
        $response = [
            'success' => false,
            'message' => __('general_fail'),
            'data' => [],
        ];
        try {
            $contactId = decryptString($id);
            $contact = UserContactForm::whereId($contactId)->where('deleted_at', null)->first();
            if (!$contact) {
                $response['message'] = __('not_found', ['Contact']);
                return response($response, 200);
            }
            if (!$contact->delete()) {
                $response['message'] = __('general_fail');
                return response($response, 200);
            }
            $response['success'] = true;
            $response['message'] = __('delete', ['Contact']);
            return response($response, 200);
        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
            return response($response, 200);
        }
    }

    public function createOrUpdateContact($request, $id = null) {
        $response = [
            'success' => false,
            'message' => __('general_fail'),
            'data' => [],
        ];
        try {
            if ($id) {
                $contactId = decryptString($id);
                $contact = UserContactForm::whereId($contactId)->where('deleted_at', null)->first();
                if (!$contact) {
                    $response['message'] = __('not_found', ['Contact']);
                    return response($response, 200);
                }
            }
            $rule = Rule::unique('user_contact_forms')->where(function ($query) {
                $query->where([
                    ['deleted_at', '=', null],
                    ['status', '=', config('constants.generalstatus.active')]
                ]);
            });
            if ($id) {
                $rule->ignore($contact->id);
            }
            $rules = [
                'first_name' => 'required',
                'last_name' => 'required',
                'contact_number' => 'required|numeric|digits:10',
                'message' => 'required',
                'email' => ['required', 'email', $rule],
            ];

            $customMessages = [
                'first_name.required' => __('required',['First Name']),
                'last_name.required' => __('required',['Last Name']),
                'contact_number.required' => __('required',['Contact Number']),
                'contact_number.numeric' => __('numeric',['Contact Number']),
                'contact_number.digits' => __('digits',['Contact Number', 10]),
                'message.required' => __('required',['Message']),
                'email.required' => __('required',['Email']),
                'email.email' => __('email',['Email']),
                'email.unique' => __('unique',['Email']),
            ];
            $validationData = Validator::make($request->all(), $rules,$customMessages);
            if ($validationData->fails()) {
                $response['message'] = $validationData->errors()->first();
                return response($response, 200);
            }
            $data = [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'full_name' => $request->first_name.' '.$request->last_name,
                'email' => $request->email,
                'contact_number' => $request->contact_number,
                'message' => $request->message,
            ];
            if ($id) {
                UserContactForm::whereId($contactId)->update($data);
                $response['success'] = true;
                $response['message'] = __('update', ['Contact']);
                return response($response, 200);
            } else {
                $createContactForm = UserContactForm::create($data);
                if (!$createContactForm) {
                    $response['message'] = __('general_fail');
                    return response($response, 200);
                }
                Notification::route('mail', $data['email'])->notify(new WelcomUser($data));
                Notification::route('mail', env('ADMIN_EMAIL'))->notify(new AdminNewContact($data));
                $response['success'] = true;
                $response['message'] = __('insert', ['Contact']) . ' Our team will contact you soon.';
                return response($response, 200);
            }
        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
            return response($response, 200);
        }
    }
}
