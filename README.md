Zadanie uruchamia się w 3 krokach
1. npm i - komenda wywołana w dowolnym miejscu w solucji, w celu zainstalowania potrzebnych paczek
2. npx json-server --watch data.json - komenda wywołana koniecznie z poziomu folderu src. Wtedy json server nie utworzy nowego pliku, tylko będzie korzystał z już istniejącego
3. ng serve --o - wywołana w osobnym oknie (tak aby nie zastopować json servera) w dowolnym miejscu w solucji
