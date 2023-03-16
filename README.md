# Laravel 10 With Vue 3

## Setup .env file
To setup .env you need to run the following command.

```
cp .env.example .env
```

Than Configure some settings in .env file

1) For Database

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_user_name
DB_PASSWORD=your_password
```

2) For Email
```
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email_address
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_email_address
MAIL_FROM_NAME="${APP_NAME}"
```

3) Add the below line in your .env file
```
ADMIN_EMAIL=your_email_address
```

## Installation

To Use this project need to perform following step

```bash
# For install packages for laravel
composer install

# For installing package for Vue3
npm install

# Generate key
php artisan key:generate

# To migrate database
php artisan migrate

# To setup passport key
php artisan passport:install

# Run Seeder for Default User
php artisan db:seed
# default email-id and password for admin login
# email: admin@gmail.com
# password: Admin@123 
```

## Run the project
```bash
# To start php artisan
php artisan serve

# To Start Vue3
npm run dev

# To Start Mail queue (to receive mail you need to run need command otherwise you didn't get any mail)
php artisan queue:listen
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)