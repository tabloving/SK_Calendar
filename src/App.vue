<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <el-container class="min-h-screen">
      <el-header class="bg-white shadow-sm border-b">
        <div class="flex items-center justify-between h-full">
          <div class="flex items-center space-x-4">
            <h1 class="text-xl font-bold text-gray-800">寿康宝鉴戒期日历</h1>
          </div>
          <nav class="flex space-x-6">
            <router-link
              to="/"
              class="text-gray-600 hover:text-blue-600 transition-colors"
              :class="{ 'text-blue-600 font-semibold': $route.name === 'calendar' }"
            >
              日历
            </router-link>
            <router-link
              to="/settings"
              class="text-gray-600 hover:text-blue-600 transition-colors"
              :class="{ 'text-blue-600 font-semibold': $route.name === 'settings' }"
            >
              设置
            </router-link>
            <router-link
              to="/test"
              class="text-gray-600 hover:text-blue-600 transition-colors"
              :class="{ 'text-blue-600 font-semibold': $route.name === 'test' }"
            >
              测试
            </router-link>
          </nav>
        </div>
      </el-header>

      <el-main class="p-6 main-container">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// App组件逻辑
</script>

<style scoped>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.el-container {
  height: 100vh;
}

.main-container {
  height: calc(100vh - 60px); /* 减去header高度 */
  padding: 1.5rem; /* p-6 = 24px = 1.5rem */
  overflow: hidden;
}
</style>