// 英傑大戦 ダメージシミュレーター


// 要素取得
let myPower = document.getElementById("myPower");
let enemyPower = document.getElementById("enemyPower");
let shotCount = document.getElementById("shotCount");
let sniper = document.getElementById("sniper");



// 自武力 1～99
for(let i = 1; i <= 99; i++){

    let option = document.createElement("option");

    option.value = i;
    option.textContent = i;

    myPower.appendChild(option);

}



// 敵武力 1～99
for(let i = 1; i <= 99; i++){

    let option = document.createElement("option");

    option.value = i;
    option.textContent = i;

    enemyPower.appendChild(option);

}



// 射撃発数 1～20
for(let i = 1; i <= 20; i++){

    let option = document.createElement("option");

    option.value = i;
    option.textContent = i + "発";

    shotCount.appendChild(option);

}



// 初期値
myPower.value = 10;
enemyPower.value = 10;
shotCount.value = 5;



// 最低ダメージ処理
function minDamage(value, min){

    return value < min ? min : value;

}



// 通常ダメージ計算
function calcDamage(my, enemy){


    // 乱戦
    let clash =
    5.2 + my * 0.8 - enemy * 0.8;

    clash = minDamage(clash,1);



    // 槍撃（最低2）
    let spear =
    2 + 0.29 * (my - enemy);

    spear = minDamage(spear,2);



    // 突撃
    let charge =
    19 + my * 1.4 - enemy * 1.4;

    charge = minDamage(charge,1);



    // 弓
    let bow = clash;



    // 斬撃
    let slash =
    15 + my - enemy;

    slash = minDamage(slash,1);



    return {
        clash,
        spear,
        charge,
        bow,
        slash
    };

}



// 射撃計算
function calcShot(my, enemy, count, sniperOn){


    // 1発ダメージ
    let one =
    5 + 0.6 * my - 0.6 * enemy;


    // 射撃1発最低1
    one = minDamage(one,1);



    // 基本合計
    let base =
    one * count;



    // ヒットボーナス累積
    let bonus = 0;

    for(let i = 4; i <= count; i++){

        bonus += 0.5 * (i - 2);

    }



    // 狙撃
    let sniperBonus = 0;

    if(sniperOn){

        sniperBonus =
        0.5 * count;

    }



    return {

        one,
        base,
        bonus,
        sniperBonus,

        total:
        base + bonus + sniperBonus

    };

}



// 射撃表示
function shotText(my, enemy){


    let oneShot =
    calcShot(
        my,
        enemy,
        1,
        sniper.checked
    );


    let fullShot =
    calcShot(
        my,
        enemy,
        Number(shotCount.value),
        sniper.checked
    );


    return (

    "射撃1発 "
    +
    oneShot.total.toFixed(1)
    +
    "<br>"
    +
    "射撃"
    +
    shotCount.value
    +
    "発 "
    +
    fullShot.total.toFixed(1)

);

}



// 武力1～12一覧表示
function createTable(){


    let my =
    Number(myPower.value);


    let html = "";


    for(let enemy = 1; enemy <= 12; enemy++){


        let d =
        calcDamage(my, enemy);



        html +=

        "<div class='card'>"

        +"敵武力 "+enemy+"<br>"

        +"乱戦 "+d.clash.toFixed(1)+"<br>"

        +"槍撃 "+d.spear.toFixed(1)+"<br>"

        +"突撃 "+d.charge.toFixed(1)+"<br>"

        +"弓 "+d.bow.toFixed(1)+"<br>"

        +"斬撃 "+d.slash.toFixed(1)+"<br>"

        +shotText(my,enemy)

        +"</div>";

    }


    document.getElementById("table").innerHTML = html;

}



// 任意敵武力表示
function createDetail(){


    let my =
    Number(myPower.value);


    let enemy =
    Number(enemyPower.value);



    let d =
    calcDamage(my, enemy);



    document.getElementById("detail").innerHTML =


    "<div class='card'>"

    +"自武力 "+my
    +" / 敵武力 "+enemy
    +"<br><br>"

    +"乱戦 "+d.clash.toFixed(1)+"<br>"

    +"槍撃 "+d.spear.toFixed(1)+"<br>"

    +"突撃 "+d.charge.toFixed(1)+"<br>"

    +"弓 "+d.bow.toFixed(1)+"<br>"

    +"斬撃 "+d.slash.toFixed(1)
    
    +"<br><br>"

    +shotText(my,enemy)

    +"</div>";

}



// 更新処理

function update(){

    createTable();

    createDetail();

}



// 変更時更新

myPower.onchange = update;

enemyPower.onchange = update;

shotCount.onchange = update;

sniper.onchange = update;



// 初期表示

update();