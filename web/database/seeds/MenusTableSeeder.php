<?php

use Illuminate\Database\Seeder;
use App\Menu;

class MenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    private function batch($names, $calories, $restaurant_id, $categories){
        for($i=0 ; $i<count($names) ; $i++){
            try{
                $m = new Menu();
                $m->menu_category_id = $categories[$i];
                $m->restaurant_id = $restaurant_id;
                $m->name = $names[$i];
                $m->image = '-';
                $m->calory = $calories[$i];
                $m->save();
           }catch(Exception $e){
           }
        }
    }

    public function run()
    {
        $names = ["Ayam Dada","Ayam Paha Bawah","Ayam Paha Atas","Ayam Sayap","Chili Sauce (1 TBS)","Nasi","Jumbo 1 (2 Dada 1 Nasi )","Jumbo 2 ( Dada/Paha Atas + Sayap + Nasi)","Jumbo 3  ( Paha bawah 2 + Nasi )","Milo 1 Cup ( High Sugar )","Es Teh Manis ( High Sugar )","Es Teh Tawar","Nutrisari ( High Sugar )"];
        $calories = ["320","120","290","129","20","129","769","578 / 548","369","130","260","4","120",""];
        $categories = ["1","1","1","1","1","3","1","1","1","1","1","1","1"];
        $this->batch($names, $calories, 1, $categories);

        $names = ["Bakmi Keriting/Lebar Ayam Biasa Polos","Bakmi Keriting/Lebar Ayam Biasa  Pangsit / Pangsit Goreng","Bakmi Keriting/Lebar Ayam Biasa  + Baso","Bakmi Keriting/Lebar Ayam Biasa + Baso + Pangsit / Pangsit Goreng","Bakmi Keriting/Lebar Ayam Biasa  + Baso + Pangsit + Pangsit Goreng","Bakmi Keriting/Lebar Ayam Jumbo Polos","Bakmi Keriting/Lebar Ayam Jumbo  Pangsit / Pangsit Goreng","Bakmi Keriting/Lebar Ayam Jumbo  + Baso","Bakmi Keriting/Lebar Ayam Jumbo + Baso + Pangsit / Pangsit Goreng","Bakmi Keriting/Lebar Ayam Jumbo  + Baso + Pangsit + Pangsit Goreng","Kwetiau  Ayam Biasa Polos","Kwetiau  Ayam Biasa  Pangsit / Pangsit Goreng","Kwetiau  Ayam Biasa  + Baso","Kwetiau  Ayam Biasa + Baso + Pangsit / Pangsit Goreng","Kwetiau  Ayam Biasa  + Baso + Pangsit + Pangsit Goreng","Kwetiau  Ayam Jumbo Polos","Kwetiau  Ayam Jumbo  Pangsit / Pangsit Goreng","Kwetiau  Ayam Jumbo  + Baso","Kwetiau  Ayam Jumbo + Baso + Pangsit / Pangsit Goreng","Kwetiau  Ayam Jumbo  + Baso + Pangsit + Pangsit Goreng","Bihun Ayam Biasa Polos","Bihun Ayam Biasa  Pangsit / Pangsit Goreng","Bihun Ayam Biasa  + Baso","Bihun Ayam Biasa + Baso + Pangsit / Pangsit Goreng","Bihun Ayam Biasa  + Baso + Pangsit + Pangsit Goreng","Bihun Ayam Ayam Jumbo Polos","Bihun Ayam Jumbo  Pangsit / Pangsit Goreng","Bihun Ayam Jumbo  + Baso","Bihun Ayam Jumbo + Baso + Pangsit / Pangsit Goreng","Bihun Ayam Jumbo  + Baso + Pangsit + Pangsit Goreng","Pangsit Ayam Rebus / Goreng ( 2 Potong)","Bakso Sapi ( 2 Potong )","Nasi"];
        $calories = ["309","389","423","503","583","429","509","543","623","703","282","362","396","476","556","402","482","561","596","676","185","265","299","379","459","305","385","419","499","579","80","114","129"];
        $categories = ["2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2"];
        $this->batch($names, $calories, 2, $categories);
        
        $names = ["Fried enoki","Sate Jamur","Sate Padang","Golden noodle","Heavenly Soup","Soto Mie","Jakarta Golden Soup","Mie Goreng","Hongkong Noodle","Tom yam Soup","Loving Shabu","Red Sauce Spaghetti","Ortiental fried rice","Mushrrom Fried Rice","Seaweed Fried Rice","Kalasan Rice Set","Crispy Joy","Loving Steak","Loving Hut Brocoli"];
        $calories = ["124","30","540","195","72","100","140","314","395","80","231","230","108","325","250","290","235","265","34"];
        $fats = ["4.5","0.24","30","3.2","1.93","2","9","16.36","11.4","2","7","4","1","15","10","7","8","12","2"];
        $proteins = ["0.7","1.96","5.6","2.1","2.12","2","2","11","13.3","12","18","12","2","10","6.5","5","2.5","7","6.93"];
        $categories = ["3","3","3","3","3","3","3","3","3","3","3","3","3","3","3","3","3","1","3"];
        $this->batch($names, $calories, 3, $categories);

        $names = ["Spicy Chicken","Vegatarian","Crabstik Eby Roll","Crabstik Tempura","Chicken Katsu","Spicy Tuna","Beef Roll","Karakatau","Crunchy Eby","Salmon Salad","Salmon Cheese","California","Crispy Tuna","Salmon Crispy","Dragon Roll","Tempura Uramaki","Flaming Salmon","Crunchy Unagi","Futomaki","Chicken donburi","Tempura Donburi","Beef Donburi","Beef Blackpepper","Chicken Curry Rice","Salmon Teriyaki","Beef teriyaki","Chicken Blackpepper","Udon","Curry Udon","Curry Ramen","Ramen","Yakimeshi","Salmon Stick ( Each )","Chicken mushroom","Chicken Karaage","Soup","Nasi"];
        $calories = ["212","146","282","160","268.4","319","405","210","464","200","438","281","300","330","270","508","304","372","380","348","513","530","443","419","362","389","463","325","340","345","290","450","160","310","414","50","129"];
        $fats = ["9","0.06","17","20","4.1","19.28","14.48","6","22.4","20","36.12","9","10","4.5","8","21","8.7","17","14","5","13","14","16.08","12","5.78","9.3","23.7","1.1","14","17.4","12","14","4","4.38","17.28","0.2","0.28"];
        $proteins = ["8","0.57","8","2.4","32.8","18.22","17.66","16","7.2","11","19.6","12","12","14","20","20","13","20","21","23","19","52","28.66","24","33.6","24","25.2","8.3","7","11","7","13","12","18","10.66","1.5","2.66"];
        $categories = ["4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","5","4","4","4","4","4","4","4","4"];
        $this->batch($names, $calories, 4, $categories);
    
        $names = ["Hainam Rice + Chicken Fillet","Hainam Rice + Katsudon","Hainam Rice + Steam Chicken","Hainam Rice + Fried Chicken","Hainam Rice + Nauli Chicken","Hainam Rice + Spicy Crispy Chicken","Hainam Rice + Chicken Gepuk","Fried Chicken","Steam Chicken","Chicken Fillet","Chicken Nauli","Chicken Gepuk","Spicy Crsipy Chicken","Hainam rice"];
        $calories = ["638","688","618","660","648","665","625","251","231","301","261","241","278","387"];
        $fats = ["28.4","30.2","24.4","28.5","29.3","29","28.2","18.5","14.4","19.9","18.8","17.9","18.5","10.5"];
        $proteins = ["20.8","29.9","22.2","23.6","22.5","21","24.4","20.4","19","17.6","19.3","21.2","17.8","3.2"];
        $categories = ["2","2","2","2","2","2","2","2","2","2","2","2","2","2"];
        $this->batch($names, $calories, 5, $categories);
    
        $names = ["Original Gyudon","Mayo-Don","Sambel Matah Gyudon","Sambel Ijo Gyudon"];
        $calories = ["260","310","305","310"];
        $fats = ["18","25","21","23"];
        $proteins = ["18","18","18","18"];
        $categories = ["4","4","4","4"];
        $this->batch($names, $calories, 6, $categories);

        $names = ["Bakso halus","Bakso Urat Kecil","Bakso Urat Gede","Bakso kecil + Tahu","Bakso kecil + Telor","Bakso Kecil + Tahu + Telor","Bakso Gede","Bakso Gede + Tahu","Bakso Gede + Telor","Bakso Gede + Tahu + Telor","Bakso Gede + Kecil"];
        $calories = ["343","303","365","421","468","546.8","383","461","508.1","586.1","676"];
        $fats = ["9.3","8.6","10.2","14.3","17.7","22.7","12.5","17.6","21","26","22"];
        $categories = ["3","3","3","3","3","3","3","3","3","3","3"];
        $this->batch($names, $calories, 7, $categories);
    
        $names = ["Alpukat","Apel","Belimbing","Jambu","Mangga","Melon","Naga","Pisang","Sirsak","Pear","Terong Belanda","Semangka","Stawrberry","Sunkis","Juice Mix 2 Buah","Juice Mix 3 Buah","Fruit Ice Cream","Puket Ice Cream","Puket Cina","Ice Mangga","Ice Melon","Ice Semangka","Ice Strawberry","Fruit's Soup / Soup Buah","Soda Susu","Ice / Hot Cappucino","Ice / Hot Chocolate","Omon's Orange","Omon's Milk","Apple Tea","Sweet Stean Corn"];
        $calories = ["277","79","110","40","128","80","160","88","90","51","72","110","90","100","120-150","150-165","110","130","130","130","122","100","111","177","165","280","230","…","…","58","57.45"];
        $categories = ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","2","3","3","3","3","3","1","1","1","1","1","1","3"];
        $this->batch($names, $calories, 8, $categories);
        
        $names = ["Original","Original  + Sosis","Original + Keju","Original +Telur","Original  + Sosis + Keju","Original  + Sosis + Telur","Original + Keju  + Telur","Original  + Sosis + Keju + Telur","Sosis","Telur","Keju ( 1 Tbs )"];
        $calories = ["290","354.3","310","335.1","374.3","399.4","374.3","419.4","64.3","45.1","20"];
        $categories = ["1","1","1","1","1","1","1","1","1","1","1"];
        $this->batch($names, $calories, 9, $categories);

        $names = ["Burgeria","Chicken Sousage","Smoke Beef Cheez","Chicken Cheez","Beef Bolognese","Chocolato","Cheez","Chocolato Cheez","Banana Choco","Banana Cheez","Banana Choco Cheez","Chocolato Nut","Chocolato Nut Cheez","Chocomaltine","SilverQueen","Pisang + Es Krim","Coklat + Es Krim","Strawberry + Es Krim","Durian + Es Krim","Burger","Chicken Sousage","Smoke beef","Smoke Chicken","Mayonaise","Banana","Sirup Coklat","Lunch Box","Ice Cream","Stawberry","Choco Chips","Wijen"];
        $calories = ["284","173.3","274.5","228","264.6","140","165","185","170","185","200","170","210","192.25","270","296.3","276.8","303.5","343.8","175","64.3","111.6","119","100","100","108.8","…","196.8","106.7","80","77"];
        $categories = ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"];
        $this->batch($names, $calories, 10, $categories);

        $names = ["Nasi Goreng Spesial","Nasi Goreng Ikan Asin","Kwetiau Rebus","Nasi Soto ayam","Soto Ayam","Bihun Goreng Spesial","Mie Ramen Katsu telor","Mie Ramen Sosis telor","Mie Ramen Bakso telor","Mie Ayam Spesial","Mie Ayam Spesial  + Bakso","Nasi + Ayam Goreng Kremes ( Breast )","Ayam goreng Kremes Tanpa Nasi","Nasi Ayam penyet Cabe Hijau","Various Fish Snack","Ketang Cheese","Kentang Mayonaise","Kentang Bolognaise","Nasi Ayam penyet Cabe Merah","Kwetiau Goreng"];
        $calories = ["370","419","175","401.5","367","373.3","425","388","456","421","478","361","232","650","365","354","325","332","650","338"];
        $categories = ["3","3","3","3","3","3","3","3","3","3","3","3","3","3","1","1","1","1","3","3"];
        $this->batch($names, $calories, 11, $categories);

        $names = ["Nasi + Root Beer ( Gratisan )","Soup + Root Beer ( Gratisan )","Telur + Root Beer ( Gratisan )","Duo Aroma ( Breast + Drumstick Or Sayap )","1 Chicken + 1 Soup ( Breast / Drumstick )","1 Chicken + Chicken Chunk ( Breast / Drumstick )","1 Chicken + Deluxe Burger ( Breast / Drumstick )","1 Chicken  + Chicken Sandwich ( Breast / Drumstick )","1 Chicken + BlackPepper bowl ( Chicken Bowl) ( Breast / Drumstick )","Curly + Root Beer ( Gratis )","Strip + Root Beer ( Gratis )","Mozza","Deluxe Burger","Fish Sandwich","Duo Aroma ( Breast / Wing )","Chicken Sandwich","Mango Chicken Pocket","Beef  Burger","Chicken Burger","Mozza","Deluxe Burger","chicken Sandwich","Fish Sandwich","Veggie Burger","Mango chicken pocket","4 Chicken Chunk","3 Chicken wings","Chicken Mixbowl / Black Pepper bowl","French fries","Curly Fries","Duo Fries","Waffle Ice cream","Waffle butter with syrup","Waffle Sunday","Milk Shake(Stawberry / Choco / Vanila )","Cone Regular","Monas ( Large )","Sundaes (Choco/Strawberry)","Spicy Aroma Chicken ( Breast / Drumstick )","2 Chicken Chunk","Sunny Egg On rice","Sunny Egg","Potato Perkedel","Chicken Soup","Root Beer Reguler","Root Beer Jumbo","Roo Beer With Float"];
        $calories = ["429","380","400","500","440/240","690/490","783/583","630/430","645/445","610","610","440","433","574","400/340","280","250","359","280","440","433","280","574","320","250","340","240","295","310","310","410","384","456","384","840/880/900","200","260","320/300","350/150","220","199","70","143","90","300","330","350"];
        $categories = ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","4","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"];
        $this->batch($names, $calories, 12, $categories);

        $names = ["Simple Set Teriyaki 1","Simple Set Teriyaki 2","Simple Set Yakiniku  1","Simple Set Yakiniku  2"];
        $calories = ["451","465","491","495"];
        $categories = ["4","4","4","4"];
        $this->batch($names, $calories, 13, $categories);

        $names = ["Chic Finger","Chic Katsu","Chic Teriyaki","Chic Bowl","Beef Bowl","Chic ala Ciz n Chic","Chic Strip","Chic Blackpepper","Chic Steak","Oriental Chic","Chic Schnitzel","Gravy Chicken","Cheesy Chic","Curly Chic","Chic Melted","Fish n Chip","Fried Calamari","Cordon Bleu","Beef Steak","Hot Chic Mozzarella","Beef Stroganoff","Beef Black Pepper","Beef Steak Mozzarella","Steak Combo","Mixed Grill","Fetucinne Carbonara","Spaghetti Bolognaise","Spaghetti Aglio Olio","Spaghetti  Ayam Pedas","Spaghetti Chic Blackpepper","French Fries","Chessy Fries","Onion Ring","Chic Skin"];
        $calories = ["426","471","435","510","552","524","426","529","469","442","547","452","457","486","519.2","516","436","562","423","494.2","500","483","508","591","488","436","401","435.8","407.8","352","156","266","94","129"];
        $categories = ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"];
        $this->batch($names, $calories, 14, $categories);
 
        $names = ["Ayam Blenger PSP Level 1 - 10","Ayam Blenger Termoz Level 1 - 10","Nasgor Spesial PSP Level 1 - 10","PSP Indomie Level 1 - 10","PSP Blenger Tulang Level 1 - 10","PSP Sambal Matah","PSP Sambal Ijo"];
        $calories = ["466","649","601","642","425","527","497"];
        $categories = ["3","3","3","3","3","3","3"];
        $this->batch($names, $calories, 15, $categories);

        $names = ["Ayam Goreng Kriuk","Ayam Goreng Balado","Ayam Goreng Crispy","Ayam Goreng Bumbu Sate","Ayam Goreng Kalasan","Ayam Bakar BBQ","Ayam Bakar Bumbu Sate","Spaghetti Bakar","Spaghetti Balado","Spaghetti Geprek Matah Bali","Spaghetti Bumbu Sate","Spaghetti Matah Bali","Mie Keriting Pontianak","Mie Ayam Barbeque","Mie Ayam Balado","Mie Ayam","Mie Geprek Matah Bali","Steak Matah Bali","Steak Geprek Matah Bali","Steak Bumbu Sate","Steak Balado","Dori Mayo","Dori Balado","Dori Bumbu Sate","Dori Matah Bali","Ayam Goreng Rendang","Steak Rendang","Dori Rendang","Spaghetti Rendang"];
        $calories = ["487","527","507","512","494","467","451","502","573","543","458","594","489","445","461","421","542","578","527","547","557","498","454","424","455","519","572","449","537"];
        $categories = ["3","3","3","3","3","3","3","3","3","3","3","3","3","3","3","3","3","3","3","3","3","1","3","3","3","3","3","3","3"];
        $this->batch($names, $calories, 16, $categories);

        $names = ["Salmon Matah","Beef Matah","Chicken Pepper Rice Kari","Chicken Pepper Rice Ori","Chicken Pepper Rice Balado","Beef Pepper Rice Rendang","Beef Pepper Rice Kari","Beef Pepper Rice Gulai Beef","Beef Pepper Rice Original","Pepper Rice Gulai Salmon","Pepper Rice Ori Salmon"];
        $calories = ["525","621","414","354","394","522","527","498","467","495","464"];
        $categories = ["3","3","3","3","3","3","3","3","3","3","3"];
        $this->batch($names, $calories, 17, $categories);

        $names = ["Paket Indomie Geprek","Paket Indomie Geprek Jumbo","Paket Indomie Geprek Blenger","Paket Bakso Kuah Super","Paket Bakso Penyet","Nasi Krikil","Paket Geprek","Paket Geprek Jumbo","Geprek Blenger"];
        $calories = ["642","802","1029","388","432","254","466","582.5","649"];
        $categories = ["3","3","3","3","3","3","3","3","3"];
        $this->batch($names, $calories, 18, $categories);
    }
}
