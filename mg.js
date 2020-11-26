function MainMG(canvas) {

    // Предварительные установки

	var deg = Math.PI / 180;			// Угловой градус (degree)

	var X_max = canvas.width;
 	var Y_max = canvas.height;
	
    // Размерные параметры

    var g = 1.;    // ускорение свободного падения
    var v0 = 1.;    // начальная скорость
	
    // Расчет констант 
	
	var h = v0 * v0 / 2 / g;
	
    // Задание начальных значений параметров
	
	var al = 60 * deg;
    
	// Область построения графика
    var x_min = 0;  
    var x_max = 2 * h;
    var y_min = 0;    
    var y_max = h;      

 	var N = X_max;                 	// число точек по оси x
	var dx = x_max / N;            	// шаг по оси x
	var sx = X_max / x_max;        	// масштаб по оси x

	var sy; 							// масштаб по оси y
	var Y0;  							// положение 0 оси y в экранных координатах
	var context;  						// на context происходит рисование

    // настройка слайдеров и текстовых полей
	
    Text_01.value = Math.round(al / deg);
	Slider_01.min = 0;       	
    Slider_01.max = 90;
    Slider_01.step = 1;
    Slider_01.value = Text_01.value;     	
	
	draw();

    // функция, запускающаяся при перемещении слайдера
    this.set_01 = function(input) { al = input * deg; draw(); }  
    
	// Функции, запускающиеся при изменении элементов управления
    this.setCheckbox_01 = function(bool) { draw(); }
	this.setCheckbox_02 = function(bool) { draw(); }	

	// Отображение
	
	function draw() 
	{ 
	   // Расчет параметров графики
		
		sy = Y_max / (y_max - y_min); 			// масштаб по оси y
		Y0 = Y_max + y_min * sy;  				// положение 0 оси y в экранных координатах

		context = canvas.getContext("2d");  	// на context происходит рисование
		context.clearRect(0, 0, X_max, Y_max); 	// очистить экран
        
		// Графики 

		Graph(F0, 	checkbox_02.checked, 	'lightgrey');		
		Graph(F1, 	checkbox_01.checked, 	'black');

        // Надписи
        context.fillStyle = 'black';
        context.font = "italic 20px Times";
        context.fillText("x", x_max * sx - 15, Y0 - 7);
        context.fillText("y", 5, 15);
        context.fillText("0", 10, Y0 - 3);
	}

	// Построение графика функции
	
	function Graph(F, flag, color)
	{
		if (!flag) return;
		
		context.strokeStyle = color;
		context.beginPath();
		for (var x = x_min; x < x_max; x += dx)
		{
			var y = F(x);
			var X = x * sx; 
			var Y = Y0 - y * sy; 
			context.lineTo(X, Y);	
		}
		context.stroke();
	}	
	
    // Траектории
    
    // al = 45 * deg;
	function F0(x) 	
    {
		var y = x - g / (v0 * v0) * x * x; 
		return y;
    }    

    // Произвольное al
	function F1(x)
    {
		var t = x / v0 / Math.cos(al) 
		var y = v0 * Math.sin(al) * t - g * t * t / 2; 
		return y;
    }    
}