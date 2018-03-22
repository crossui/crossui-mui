(function($, window) {
	/**
	 * 数据加载提示层
	 */
	$.loading = function(message, callback) {
		if(!message){
			message = '数据正加载中...'
		}else if(message=='close'){
			var el = document.getElementById('muiLoading');
			el.parentNode.removeChild(el);
			var box = document.getElementById('muiLoadingBox');
			box.parentNode.removeChild(box);
			return;
		}
		var backdrop = document.createElement('div');
		backdrop.setAttribute("id","muiLoading");
		backdrop.classList.add('mui-popup-backdrop', 'mui-active', 'mui-loading-bg');
		document.body.appendChild(backdrop);

		var popupElement = document.createElement('div');
		popupElement.setAttribute("id","muiLoadingBox");
		popupElement.classList.add('mui-loading-box');
		popupElement.innerHTML = '<div class="mui-loading">' +
			'<div class="mui-spinner"></div>' +
			'<div class="mui-loading-text">'+message+'</div></div>';

		document.body.appendChild(popupElement);
		popupElement.style.marginLeft = '-' + (popupElement.offsetWidth / 2) + 'px';
		popupElement.style.marginTop = '-' + popupElement.offsetHeight + 'px';
	};

})(mui, window);