// 英傑大戦 ダメージシミュレーター


// 要素取得
let myPower = document.getElementById("myPower");
let enemyPower = document.getElementById("enemyPower");
let shotCount = document.getElementById("shotCount");
let sniper = document.getElementById("sniper");
let speedA = document.getElementById("speedA");
let speedB = document.getElementById("speedB");

let cutA = document.getElementById("cutA");
let cutB = document.getElementById("cutB");

let battleCount = document.getElementById("battleCount");

let meleePowerA =
document.getElementById("meleePowerA");

let meleePowerB =
document.getElementById("meleePowerB");

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


// 乱戦用武力
for(let i=1;i<=99;i++){

    let op=document.createElement("option");

    op.value=i;
    op.textContent=i;

    meleePowerA.appendChild(op.cloneNode(true));
    meleePowerB.appendChild(op);

}

meleePowerA.value=10;
meleePowerB.value=10;


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



/// 武力1～12一覧表示
function createTable(){

    let attack =
    document.getElementById("attackType").value;

    let html = "<table>";

    // 横軸
    html += "<tr>";

    html += "<th>自\\敵</th>";

    for(let enemy = 1; enemy <= 12; enemy++){

        html += "<th>" + enemy + "</th>";

    }

    html += "</tr>";

    // 縦軸
    for(let my = 1; my <= 12; my++){

        html += "<tr>";

        html += "<th>" + my + "</th>";

        for(let enemy = 1; enemy <= 12; enemy++){

            let d =
            calcDamage(my, enemy);

            let value = 0;

            switch(attack){

                case "clash":
                    value = d.clash;
                    break;

                case "spear":
                    value = d.spear;
                    break;

                case "charge":
                    value = d.charge;
                    break;

                case "bow":
                    value = d.bow;
                    break;

                case "slash":
                    value = d.slash;
                    break;

                case "shot":

                    value =
                    calcShot(
                        my,
                        enemy,
                        Number(shotCount.value),
                        sniper.checked
                    ).total;

                    break;

            }

            html +=
            "<td>" +
            value.toFixed(1) +
            "</td>";

        }

        html += "</tr>";

    }

    html += "</table>";

    document.getElementById("damageTable").innerHTML = html;

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

    +"自武力 "
    + my

    +" / 敵武力 "
    + enemy

    +"<br><br>"

    +"乱戦 "
    + d.clash.toFixed(1)

    +"<br>"

    +"槍撃 "
    + d.spear.toFixed(1)

    +"<br>"

    +"突撃 "
    + d.charge.toFixed(1)

    +"<br>"

    +"弓 "
    + d.bow.toFixed(1)

    +"<br>"

    +"斬撃 "
    + d.slash.toFixed(1)

    +"<br><br>"

    + shotText(my, enemy)

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

document.getElementById("attackType").onchange = update;



// 初回表示
update();


for(let i=10;i<=25;i++){

    let op=document.createElement("option");

    op.value=i/10;
    op.textContent=(i/10).toFixed(1)+"倍";

    speedA.appendChild(op.cloneNode(true));
    speedB.appendChild(op);

}

speedA.value=1;
speedB.value=1;

for(let i=10;i>=1;i--){

    let op=document.createElement("option");

    op.value=i/10;
    op.textContent=(i/10).toFixed(1)+"倍";

    cutA.appendChild(op.cloneNode(true));
    cutB.appendChild(op);

}

cutA.value=1;
cutB.value=1;

for(let i=1;i<=99;i++){

    let op=document.createElement("option");

    op.value=i;
    op.textContent=i+"カウント";

    battleCount.appendChild(op);

}

battleCount.value=5;

function updateMelee(){

    let my = Number(meleePowerA.value);
    let enemy = Number(meleePowerB.value);

    let count = Number(battleCount.value);


    // 乱戦間隔
    let intervalA = 0.6 / Number(speedA.value);
    let intervalB = 0.6 / Number(speedB.value);


    // 経過カウント中の乱戦回数
    let hitA = Math.floor(count / intervalA);
    let hitB = Math.floor(count / intervalB);



    // 1回の乱戦ダメージ
    let damageA =
    (5.2 + enemy * 0.8 - my * 0.8)
    * Number(cutB.value);


    let damageB =
    (5.2 + my * 0.8 - enemy * 0.8)
    * Number(cutA.value);



    damageA = Math.max(damageA,1);
    damageB = Math.max(damageB,1);



    // 総ダメージ
    let totalA = damageA * hitA;
    let totalB = damageB * hitB;


    // 残兵力
    let hpA = 100 - totalA;
    let hpB = 100 - totalB;


    hpA = Math.max(hpA,0);
    hpB = Math.max(hpB,0);


// 撃破に必要な乱戦回数

let aHit =
Math.ceil(100 / damageA);

let bHit =
Math.ceil(100 / damageB);


// 撃破カウント数

let aKillB =
aHit * intervalA;

let bKillA =
bHit * intervalB;


let killText =

"武将A → 武将B　"
+ aHit
+ "回 ("
+ aKillB.toFixed(2)
+ "c / "
+ (aKillB * 2.4).toFixed(1)
+ "秒)<br>"

+

"武将B → 武将A　"
+ bHit
+ "回 ("
+ bKillA.toFixed(2)
+ "c / "
+ (bKillA * 2.4).toFixed(1)
+ "秒)";


    document.getElementById("meleeResult").innerHTML=`

<h3>戦闘結果</h3>

<table>

<tr>
<th></th>
<th>武将A</th>
<th>武将B</th>
</tr>


<tr>
<td>乱戦速度</td>
<td>${speedA.value}倍<br>${intervalA.toFixed(2)}c</td>
<td>${speedB.value}倍<br>${intervalB.toFixed(2)}c</td>
</tr>


<tr>
<td>ダメージカット倍率</td>
<td>${cutA.value}倍</td>
<td>${cutB.value}倍</td>
</tr>


<tr>
<td>経過カウント</td>
<td colspan="2">${count}c</td>
</tr>


<tr>
<td>乱戦回数</td>
<td>${hitA}回</td>
<td>${hitB}回</td>
</tr>


<tr>
<td>与える総ダメージ</td>
<td>${totalA.toFixed(1)}</td>
<td>${totalB.toFixed(1)}</td>
</tr>


<tr>
<td>残兵力</td>
<td>${hpB.toFixed(1)}</td>
<td>${hpA.toFixed(1)}</td>
</tr>

</table>


<br>

<b>相手撃破カウント</b><br>

${killText}

`;

}

speedA.onchange=updateMelee;
speedB.onchange=updateMelee;

cutA.onchange=updateMelee;
cutB.onchange=updateMelee;

battleCount.onchange=updateMelee;

myPower.onchange=()=>{
    update();
    updateMelee();
};

enemyPower.onchange=()=>{
    update();
    updateMelee();
};

meleePowerA.onchange=updateMelee;
meleePowerB.onchange=updateMelee;

updateMelee();
