<script setup lang="ts">
import { useDevice, useScreen, usePlatform } from '@shared/lib'
import { PageContainer, Card } from '@shared/ui'

const device = useDevice()
const screen = useScreen()
const platform = usePlatform()
</script>

<template>
  <PageContainer title="Device Detection Test">
    <div class="device-test-grid">
      <Card>
        <h3>Device Type</h3>
        <div class="info-block">
          <p>
            <strong>Type:</strong>
            {{ device.deviceType.value }}
          </p>
          <p>
            <strong>isMobile:</strong>
            <span :class="{ active: device.isMobile.value }">
              {{ device.isMobile.value }}
            </span>
          </p>
          <p>
            <strong>isTablet:</strong>
            <span :class="{ active: device.isTablet.value }">
              {{ device.isTablet.value }}
            </span>
          </p>
          <p>
            <strong>isDesktop:</strong>
            <span :class="{ active: device.isDesktop.value }">
              {{ device.isDesktop.value }}
            </span>
          </p>
        </div>
      </Card>

      <Card>
        <h3>Screen & Breakpoints</h3>
        <div class="info-block">
          <p>
            <strong>Breakpoint:</strong>
            {{ screen.breakpoint.value }}
          </p>
          <p>
            <strong>Size:</strong>
            {{ screen.width.value }}x{{ screen.height.value }}
          </p>
          <p>
            <strong>isMobileBreakpoint:</strong>
            <span :class="{ active: screen.isMobileBreakpoint.value }">
              {{ screen.isMobileBreakpoint.value }}
            </span>
          </p>
          <p>
            <strong>isTabletBreakpoint:</strong>
            <span :class="{ active: screen.isTabletBreakpoint.value }">
              {{ screen.isTabletBreakpoint.value }}
            </span>
          </p>
          <p>
            <strong>isDesktopBreakpoint:</strong>
            <span :class="{ active: screen.isDesktopBreakpoint.value }">
              {{ screen.isDesktopBreakpoint.value }}
            </span>
          </p>
        </div>

        <div class="breakpoint-checks">
          <h4>Breakpoint Checks</h4>
          <div class="breakpoint-row">
            <span
              :class="['breakpoint-badge', { active: screen.screen.value.is.xs }]"
            >
              xs
            </span>
            <span
              :class="['breakpoint-badge', { active: screen.screen.value.is.sm }]"
            >
              sm
            </span>
            <span
              :class="['breakpoint-badge', { active: screen.screen.value.is.md }]"
            >
              md
            </span>
            <span
              :class="['breakpoint-badge', { active: screen.screen.value.is.lg }]"
            >
              lg
            </span>
            <span
              :class="['breakpoint-badge', { active: screen.screen.value.is.xl }]"
            >
              xl
            </span>
          </div>
        </div>
      </Card>

      <Card>
        <h3>Platform</h3>
        <div class="info-block">
          <p>
            <strong>OS:</strong>
            {{ platform.os.value }}
          </p>
          <p>
            <strong>Browser:</strong>
            {{ platform.browser.value }}
          </p>
          <p>
            <strong>Has Touch:</strong>
            <span :class="{ active: platform.hasTouch.value }">
              {{ platform.hasTouch.value }}
            </span>
          </p>
          <p>
            <strong>isMobile:</strong>
            <span :class="{ active: platform.isMobile.value }">
              {{ platform.isMobile.value }}
            </span>
          </p>
          <p>
            <strong>isDesktop:</strong>
            <span :class="{ active: platform.isDesktop.value }">
              {{ platform.isDesktop.value }}
            </span>
          </p>
          <p>
            <strong>isIOS:</strong>
            <span :class="{ active: platform.isIOS.value }">
              {{ platform.isIOS.value }}
            </span>
          </p>
          <p>
            <strong>isAndroid:</strong>
            <span :class="{ active: platform.isAndroid.value }">
              {{ platform.isAndroid.value }}
            </span>
          </p>
        </div>

        <div class="device-checks">
          <h4>Specific Devices</h4>
          <div class="info-block">
            <p>
              <strong>iPhone:</strong>
              {{ platform.platform.value.device.isIPhone }}
            </p>
            <p>
              <strong>iPad:</strong>
              {{ platform.platform.value.device.isIPad }}
            </p>
            <p>
              <strong>iPod:</strong>
              {{ platform.platform.value.device.isIPod }}
            </p>
            <p>
              <strong>Kindle:</strong>
              {{ platform.platform.value.device.isKindle }}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3>Responsive Test</h3>
        <div class="responsive-demo">
          <div v-if="device.isMobile.value" class="demo-box mobile">
            Mobile View
          </div>
          <div v-else-if="device.isTablet.value" class="demo-box tablet">
            Tablet View
          </div>
          <div v-else class="demo-box desktop">Desktop View</div>
        </div>

        <div class="instructions">
          <h4>Test Instructions</h4>
          <ul>
            <li>Resize browser window to see reactive updates</li>
            <li>Open Chrome DevTools > Device Toolbar</li>
            <li>Select different devices (iPhone, iPad, etc.)</li>
            <li>Values should update automatically</li>
          </ul>
        </div>
      </Card>
    </div>
  </PageContainer>
</template>

<style scoped lang="scss">
.device-test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.info-block {
  p {
    margin: 0.5rem 0;
    font-size: 0.95rem;

    strong {
      display: inline-block;
      min-width: 180px;
      color: var(--color-primary);
    }

    span.active {
      color: var(--color-positive);
      font-weight: 600;
    }
  }
}

.breakpoint-checks {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-dark);

  h4 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: var(--color-primary);
  }
}

.breakpoint-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.breakpoint-badge {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: var(--color-dark);
  color: #fff;
  font-size: 0.85rem;
  text-transform: uppercase;
  font-weight: 600;
  opacity: 0.3;
  transition: all 0.2s;

  &.active {
    opacity: 1;
    background: var(--color-primary);
  }
}

.device-checks {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-dark);

  h4 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: var(--color-primary);
  }
}

.responsive-demo {
  margin: 1rem 0;
}

.demo-box {
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  transition: all 0.3s;

  &.mobile {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &.tablet {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }

  &.desktop {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
}

.instructions {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-dark);

  h4 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: var(--color-primary);
  }

  ul {
    margin: 0;
    padding-left: 1.5rem;

    li {
      margin: 0.5rem 0;
      font-size: 0.9rem;
      color: var(--color-dark);
    }
  }
}
</style>
