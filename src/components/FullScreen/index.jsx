import './index.less'
import { Icon } from 'ant-design-vue'
const isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
const FullScreen = {
  data () {
    return {
      isFullScreen: !!isFullscreen
    }
  },
  render () {
    // this.isFullScreen = !!isFullscreen

// 监听全屏状态，全屏返回dom，否则返回false
    document.addEventListener('fullscreenchange', function () {
      // eslint-disable-next-line no-irregular-whitespace
      this.isFullScreen = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false
    }, false)
    document.addEventListener('mozfullscreenchange', function () {
      // eslint-disable-next-line no-irregular-whitespace
      this.isFullScreen = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false
    }, false)
    document.addEventListener('webkitfullscreenchange', function () {
      // eslint-disable-next-line no-irregular-whitespace
      this.isFullScreen = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false
    }, false)
    document.addEventListener('msfullscreenchange', function () {
      // eslint-disable-next-line no-irregular-whitespace
      this.isFullScreen = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false
    }, false)
    const toggleFullScreen = () => {
      const main = document.body
      if (this.isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }
      this.isFullScreen = !this.isFullScreen
    }
    return (
      <a class='full-screen-button' onClick={toggleFullScreen} title={this.isFullScreen ? '退出全屏' : '全屏'}>
        <Icon type={this.isFullScreen ? 'fullscreen-exit' : 'fullscreen'} />
      </a>
    )
  }
}

export default FullScreen
