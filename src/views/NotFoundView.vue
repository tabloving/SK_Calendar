<template>
  <div class="not-found-view">
    <div class="not-found-container">
      <!-- 装饰性书卷背景 -->
      <div class="scroll-decoration">
        <div class="scroll-left"></div>
        <div class="scroll-content">
          <!-- 印章风格的404 -->
          <div class="error-seal">
            <span class="seal-text">404</span>
          </div>

          <!-- 主要文字内容 -->
          <div class="error-content">
            <h1 class="error-title">此路不通</h1>
            <p class="error-subtitle">您所寻访的页面已不在此处</p>

            <!-- 装饰性分隔线 -->
            <div class="divider">
              <span class="divider-pattern"></span>
            </div>

            <!-- 提示文字 -->
            <p class="error-hint">
              或许是路径有误，或许是页面已迁移他处
            </p>

            <!-- 返回按钮 -->
            <div class="action-buttons">
              <router-link to="/" class="home-btn">
                <span class="btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="btn-text">返回首页</span>
              </router-link>

              <button @click="goBack" class="back-btn">
                <span class="btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="btn-text">返回上页</span>
              </button>
            </div>
          </div>

          <!-- 底部装饰文字 -->
          <div class="footer-quote">
            <span class="quote-text">「迷途知返，善莫大焉」</span>
          </div>
        </div>
        <div class="scroll-right"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found-view {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(180deg, var(--paper-bg) 0%, var(--paper-cream) 100%);
}

.not-found-container {
  max-width: 500px;
  width: 100%;
}

/* 书卷装饰 */
.scroll-decoration {
  display: flex;
  align-items: stretch;
}

.scroll-left,
.scroll-right {
  width: 16px;
  background: linear-gradient(180deg, #d4a574 0%, #c9956a 50%, #d4a574 100%);
  border-radius: 8px;
  box-shadow:
    inset 2px 0 4px rgba(255, 255, 255, 0.3),
    inset -1px 0 2px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(139, 90, 43, 0.25);
  position: relative;
  z-index: 2;
}

.scroll-left::after,
.scroll-right::after {
  content: '';
  position: absolute;
  top: 20px;
  bottom: 20px;
  width: 2px;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(139, 90, 43, 0.3) 10%,
    rgba(139, 90, 43, 0.3) 90%,
    transparent 100%
  );
}

.scroll-left::after {
  right: 5px;
}

.scroll-right::after {
  left: 5px;
}

.scroll-content {
  flex: 1;
  background: linear-gradient(180deg, #faf6f0 0%, #f5efe5 100%);
  border-top: 1px solid #e8dcc8;
  border-bottom: 1px solid #e8dcc8;
  margin: 0 -4px;
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.scroll-content::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 20px;
  right: 20px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 108, 0.5), transparent);
}

.scroll-content::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 20px;
  right: 20px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 108, 0.5), transparent);
}

/* 印章风格404 */
.error-seal {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #c94a3f 0%, #b8372e 100%);
  border: 3px solid #8b2920;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow:
    inset 0 0 0 2px rgba(255, 255, 255, 0.15),
    0 4px 12px rgba(139, 41, 32, 0.4);
  transform: rotate(-5deg);
  margin-bottom: 24px;
}

.error-seal::before {
  content: '';
  position: absolute;
  inset: 3px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.seal-text {
  font-size: 24px;
  font-weight: 900;
  color: #f5e6d3;
  font-family: 'Georgia', 'Times New Roman', serif;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
}

/* 错误内容 */
.error-content {
  width: 100%;
}

.error-title {
  font-size: 32px;
  font-weight: 600;
  color: #3d2817;
  letter-spacing: 8px;
  font-family: 'KaiTi', 'STKaiti', 'SimSun', 'STSong', serif;
  margin: 0 0 12px 0;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
}

.error-subtitle {
  font-size: 16px;
  color: #5c4033;
  letter-spacing: 2px;
  font-family: 'KaiTi', 'STKaiti', 'SimSun', 'STSong', serif;
  margin: 0 0 24px 0;
}

/* 分隔线 */
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
}

.divider-pattern {
  display: block;
  width: 120px;
  height: 4px;
  background:
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 4px,
      #c9a86c 4px,
      #c9a86c 6px,
      transparent 6px,
      transparent 10px
    );
  opacity: 0.6;
}

.error-hint {
  font-size: 14px;
  color: #8b7355;
  letter-spacing: 1px;
  margin: 0 0 32px 0;
  line-height: 1.8;
}

/* 按钮组 */
.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.home-btn,
.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
}

.home-btn {
  background: linear-gradient(135deg, #b8372e 0%, #c94a3f 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(184, 55, 46, 0.3);
}

.home-btn:hover {
  background: linear-gradient(135deg, #a32f27 0%, #b8372e 100%);
  box-shadow: 0 4px 12px rgba(184, 55, 46, 0.4);
  transform: translateY(-2px);
}

.back-btn {
  background: linear-gradient(135deg, #f5f0e3 0%, #ebe4d4 100%);
  color: #5c4033;
  border: 1px solid #d4c4a8;
}

.back-btn:hover {
  background: linear-gradient(135deg, #ebe4d4 0%, #e0d6c2 100%);
  box-shadow: 0 2px 8px rgba(139, 90, 43, 0.15);
  transform: translateY(-2px);
}

.btn-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon svg {
  width: 100%;
  height: 100%;
}

/* 底部引言 */
.footer-quote {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px dashed rgba(201, 168, 108, 0.4);
}

.quote-text {
  font-size: 13px;
  color: #a08060;
  letter-spacing: 3px;
  font-family: 'KaiTi', 'STKaiti', 'SimSun', 'STSong', serif;
  font-style: italic;
}

/* 响应式适配 */
@media (max-width: 640px) {
  .not-found-view {
    padding: 24px 12px;
  }

  .scroll-left,
  .scroll-right {
    width: 12px;
  }

  .scroll-content {
    padding: 36px 20px;
  }

  .error-seal {
    width: 64px;
    height: 64px;
  }

  .seal-text {
    font-size: 20px;
  }

  .error-title {
    font-size: 26px;
    letter-spacing: 6px;
  }

  .error-subtitle {
    font-size: 14px;
  }

  .action-buttons {
    flex-direction: column;
    width: 100%;
  }

  .home-btn,
  .back-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
