<template>
  <div>
    <a-dropdown :trigger="['click']">
      <a-button class="icon-btn"><UserOutlined class="icon" width="10" /></a-button>
      <template #overlay>
        <a-menu class="dropdown">
          <a-menu-item key="0">
            <span>{{ store.getAuthDetails.email }} </span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <p class="logout text-dark" @click="logout"><LogoutOutlined class="icon" /> &nbsp;&nbsp;Sign Out</p>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons-vue";
import { useAuthStore } from '../../store/auth';
import { authService } from '../../service/auth';

const { logout } = authService();
const store = useAuthStore();
</script>
<style scoped>
svg {
  margin: 0 !important;
}

.logout {
  margin: 0;
}
.icon {
  font-size: 15px;
}

.dropdown {
  width: 220px;
}

.icon-btn {
  padding: 4px 10px !important;
}
</style>
