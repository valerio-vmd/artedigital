// Usado apenas na gera??o do CSS local.
module.exports = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            void: '#000000',
            'bone-white': '#ffffff',
            'ash-gray': '#9a9a9a',
            'silver-mist': '#bdbdbd',
            'electric-iris': '#8052ff',
            'saffron-spark': '#ffb829',
            'deep-verdant': '#15846e',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
          spacing: {
            '6px': '6px',
            '12px': '12px',
            '18px': '18px',
            '24px': '24px',
            '30px': '30px',
            '36px': '36px',
            '60px': '60px',
            '96px': '96px',
            '120px': '120px',
          },
          borderRadius: {
            'pill': '9999px',
            '24px': '24px',
          }
        }
      }
    };
module.exports.content = ['./index.html', './assets/js/**/*.js'];
