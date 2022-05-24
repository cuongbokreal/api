CSS: https://cuongbokreal.github.io/api/widget/toast-message/main.css
JS: https://cuongbokreal.github.io/api/widget/toast-message/main.js

1. Add HTML '<div id='toast'></div>' vào bất cứ đâu của web

toast({
      title: '',
      message: ``,
      type: "error",
      duration: 3000
});

type:
- success 
- info 
- warning 
- error
