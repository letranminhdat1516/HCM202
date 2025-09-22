// Coze AI Chat Widget Configuration
// Khởi tạo Coze AI chat cho website HCM202+

(function() {
  // Load Coze SDK
  function loadCozeSDK() {
    return new Promise((resolve, reject) => {
      // Kiểm tra nếu SDK đã được load
      if (window.CozeWebSDK) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/oversea/index.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Khởi tạo Coze Chat Widget
  function initCozeChat() {
    try {
      new CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7552872911900557313',
        },
        componentProps: {
          title: 'HCM202+ AI Assistant',
          placeholder: 'Hỏi về tư tưởng Hồ Chí Minh...',
          // Tùy chỉnh giao diện
          theme: {
            primaryColor: '#dc143c', // Màu đỏ của flag Việt Nam
            borderRadius: '12px'
          }
        },
        auth: {
          type: 'token',
          token: 'pat_V6m3mfUZNenQFNxKPvnC6o4JmoODWDM6KpwVuqbzIrHFdLh5LegIXDw0yUuup8ot',
          onRefreshToken: function () {
            return 'pat_V6m3mfUZNenQFNxKPvnC6o4JmoODWDM6KpwVuqbzIrHFdLh5LegIXDw0yUuup8ot'
          }
        }
      });
      
      console.log('✅ Coze AI Chat đã được khởi tạo thành công!');
    } catch (error) {
      console.error('❌ Lỗi khởi tạo Coze AI Chat:', error);
    }
  }

  // Khởi động khi DOM ready
  function initialize() {
    loadCozeSDK()
      .then(() => {
        // Đợi một chút để đảm bảo SDK đã load hoàn toàn
        setTimeout(initCozeChat, 500);
      })
      .catch((error) => {
        console.error('❌ Lỗi load Coze SDK:', error);
      });
  }

  // Khởi động
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();