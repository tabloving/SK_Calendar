<template>
  <div id="app" class="min-h-screen bg-paper">
    <el-container class="min-h-screen">
      <el-header class="nav-header">
        <!-- 顶部装饰纹样 -->
        <div class="nav-pattern-top"></div>

        <div class="nav-container">
          <!-- Logo区域 - 书卷印章风格 -->
          <div class="nav-brand">
            <div class="brand-scroll">
              <div class="scroll-left"></div>
              <div class="scroll-content">
                <div class="brand-seal">
                  <span class="seal-text">寿</span>
                </div>
                <div class="brand-text">
                  <span class="brand-title">寿康日历</span>
                </div>
                <div class="brand-subtitle-group">
                  <span class="brand-subtitle-line">保身立命</span>
                  <span class="brand-subtitle-line">福寿延年</span>
                </div>
              </div>
              <div class="scroll-right"></div>
            </div>
          </div>

          <!-- 导航链接 -->
          <nav class="nav-links">
            <router-link
              to="/"
              class="nav-link"
              :class="{ 'nav-link-active': $route.name === 'calendar' }"
            >
              <span class="nav-link-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="1" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
              <span class="nav-link-text">日历</span>
            </router-link>
            <router-link
              to="/settings"
              class="nav-link"
              :class="{ 'nav-link-active': $route.name === 'settings' }"
            >
              <span class="nav-link-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="1.5"/>
                </svg>
              </span>
              <span class="nav-link-text">设置</span>
            </router-link>
          </nav>
        </div>

        <!-- 底部装饰边框 - 回纹图案 -->
        <div class="nav-border-decoration">
          <div class="border-pattern"></div>
        </div>
      </el-header>

      <el-main class="main-container px-2 lg:px-6 pt-4 lg:pt-6 pb-4 lg:pb-6" :class="{ 'settings-page': $route.name === 'settings' }">
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

/* 导航栏样式 - 中国风（浅色版） */
.nav-header {
  height: auto !important;
  padding: 0 !important;
  background: linear-gradient(180deg, #faf8f5 0%, #f5f2ed 100%);
  position: relative;
  overflow: visible;
  box-shadow: 0 1px 8px rgba(139, 90, 43, 0.08);
}

/* 顶部装饰纹样 */
.nav-pattern-top {
  height: 3px;
  background: linear-gradient(90deg,
    transparent 0%,
    #c9a86c 15%,
    #b8372e 50%,
    #c9a86c 85%,
    transparent 100%
  );
  opacity: 0.7;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Logo品牌区域 - 书卷印章风格 */
.nav-brand {
  display: flex;
  align-items: center;
}

.brand-scroll {
  display: flex;
  align-items: center;
  position: relative;
}

.scroll-left,
.scroll-right {
  width: 10px;
  height: 48px;
  background: linear-gradient(180deg, #d4a574 0%, #c9956a 50%, #d4a574 100%);
  border-radius: 5px;
  box-shadow:
    inset 2px 0 4px rgba(255, 255, 255, 0.3),
    inset -1px 0 2px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(139, 90, 43, 0.2);
  position: relative;
  z-index: 2;
}

.scroll-left::after,
.scroll-right::after {
  content: '';
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: 2px;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(139, 90, 43, 0.3) 20%,
    rgba(139, 90, 43, 0.3) 80%,
    transparent 100%
  );
}

.scroll-left::after {
  right: 3px;
}

.scroll-right::after {
  left: 3px;
}

.scroll-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  background: linear-gradient(180deg, #faf6f0 0%, #f5efe5 100%);
  border-top: 1px solid #e8dcc8;
  border-bottom: 1px solid #e8dcc8;
  margin: 0 -2px;
  position: relative;
  height: 48px;
}

.scroll-content::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 10px;
  right: 10px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 108, 0.4), transparent);
}

.scroll-content::after {
  content: '';
  position: absolute;
  bottom: 3px;
  left: 10px;
  right: 10px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 108, 0.4), transparent);
}

.brand-seal {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #c94a3f 0%, #b8372e 100%);
  border: 1.5px solid #8b2920;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.15),
    0 2px 4px rgba(139, 41, 32, 0.4);
  transform: rotate(-3deg);
}

.brand-seal::before {
  content: '';
  position: absolute;
  inset: 1px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.seal-text {
  font-size: 16px;
  font-weight: 900;
  color: #f5e6d3;
  font-family: 'SimSun', 'STSong', serif;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
}

.brand-text {
  display: flex;
  align-items: center;
}

.brand-title {
  font-size: 22px;
  font-weight: 600;
  color: #3d2817;
  letter-spacing: 6px;
  font-family: 'KaiTi', 'STKaiti', 'SimSun', 'STSong', serif;
  line-height: 1.2;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
}

.brand-subtitle-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-left: 12px;
  padding-left: 12px;
  border-left: 1px solid #c9a86c;
}

.brand-subtitle-line {
  font-size: 12px;
  color: #5c4033;
  letter-spacing: 3px;
  font-family: 'KaiTi', 'STKaiti', 'SimSun', 'STSong', serif;
  font-weight: 400;
  line-height: 1.4;
}

/* 导航链接 */
.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  color: #8b7355;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 4px;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: #b8372e;
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 1px;
}

.nav-link:hover {
  color: #5c4033;
  background: rgba(201, 168, 108, 0.1);
}

.nav-link:hover::before {
  width: 50%;
}

.nav-link-active {
  color: #fff !important;
  background: linear-gradient(135deg, #b8372e 0%, #c94a3f 100%) !important;
  box-shadow: 0 2px 6px rgba(184, 55, 46, 0.3);
}

.nav-link-active::before {
  display: none;
}

.nav-link-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-link-icon svg {
  width: 100%;
  height: 100%;
}

.nav-link-text {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
}

/* 底部装饰边框 - 简化回纹 */
.nav-border-decoration {
  height: 4px;
  background: linear-gradient(180deg, #f0ebe4 0%, #e8e2d9 100%);
  position: relative;
  overflow: hidden;
}

.border-pattern {
  height: 100%;
  background:
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 6px,
      #c9a86c 6px,
      #c9a86c 8px,
      transparent 8px,
      transparent 14px
    );
  opacity: 0.4;
}

.main-container {
  height: calc(100vh - 80px);
}

/* 桌面端：保持overflow hidden */
@media (min-width: 1024px) {
  .main-container {
    overflow: hidden;
  }

  /* 设置页面允许滚动 */
  .main-container.settings-page {
    overflow: auto;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .nav-pattern-top {
    height: 3px;
  }

  .nav-container {
    padding: 10px 16px;
  }

  .scroll-left,
  .scroll-right {
    width: 8px;
    height: 40px;
  }

  .scroll-content {
    padding: 6px 12px;
    gap: 8px;
  }

  .brand-seal {
    width: 28px;
    height: 28px;
  }

  .seal-text {
    font-size: 16px;
  }

  .brand-title {
    font-size: 22px;
    letter-spacing: 5px;
  }

  .brand-subtitle-group {
    display: none;
  }

  .nav-link {
    padding: 8px 12px;
  }

  .nav-link-text {
    display: none;
  }

  .nav-link-icon {
    width: 20px;
    height: 20px;
  }

  .nav-border-decoration {
    height: 4px;
  }
}

/* 移动端：允许内容滚动并添加上下padding */
@media (max-width: 1023px) {
  .main-container {
    overflow: auto;
    height: auto;
    padding: 16px 0;
  }
}
</style>