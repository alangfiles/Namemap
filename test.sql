update names_normalized 
set year_1880s_m = (cast year_1880s_m as float) / 
(cast (SELECT SUM(year_1880_m+year_1881_m+year_1882_m+year_1883_m+year_1884_m+year_1885_m+year_1886_m+year_1887_m+year_1888_m+year_1889_m)) as float)