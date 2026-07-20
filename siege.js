// 要素取得

let typeA = document.getElementById("typeA");
let powerA = document.getElementById("powerA");
let intelA = document.getElementById("intelA");
let costA = document.getElementById("costA");
let styleA = document.getElementById("styleA");
let weaponA = document.getElementById("weaponA");
let soulA = document.getElementById("soulA");

let typeB = document.getElementById("typeB");
let powerB = document.getElementById("powerB");
let intelB = document.getElementById("intelB");
let costB = document.getElementById("costB");
let styleB = document.getElementById("styleB");
let weaponB = document.getElementById("weaponB");
let soulB = document.getElementById("soulB");


// 武力 1～99

for (let i = 1; i <= 99; i++) {

    let option = document.createElement("option");

    option.value = i;
    option.textContent = i;

    powerA.appendChild(option.cloneNode(true));
    powerB.appendChild(option);

}


// 知力 1～20

for (let i = 1; i <= 20; i++) {

    let option = document.createElement("option");

    option.value = i;
    option.textContent = i;

    intelA.appendChild(option.cloneNode(true));
    intelB.appendChild(option);

}


// 初期値

powerA.value = 10;
powerB.value = 10;

intelA.value = 8;
intelB.value = 8;

costA.value = 2.5;
costB.value = 2.5;

typeA.value = "spear";
typeB.value = "spear";


// 兵種基礎値

function getBase(type) {

    switch(type) {

        case "horse":
            return 0.56;

        case "bow":
        case "gun":
            return 1.3;

        case "sword":
        case "scout":
        case "elephant":
            return 1.5;

        case "spear":
            return 2;
    }

}


// コスト係数

function getCost(cost) {

    switch(Number(cost)) {

        case 1:
            return 1;

        case 1.5:
            return 2.5;

        case 2:
            return 3.75;

        case 2.5:
            return 4.7;

        case 3:
            return 5.5;

        case 3.5:
            return 6.25;

        case 4:
            return 6.75;
    }

}


function calcSiege(type, power, intel, cost, style, weapon, soul) {

    // 基本攻城力

    let wall = (getBase(type) + 0.02 * power)
        * getCost(cost);


    // 英魂

    wall += Number(soul) * 0.8;


    // 部隊裏1

    if(style === "unit") {

        wall += 0.5;

    }


    // 倍率

    let rate = 1;


    if(style === "kohou") {

        rate *= 1.05;

    }

    if(style === "unit") {

        rate *= 1.1;

    }

    if(
        weapon === "shield" ||
        weapon === "onimaru"
    ) {

        rate *= 1.3;

    }


    wall *= rate;


    // 城門

    let gate = wall * 1.6;


    // 攻城速度

    let count = 2.35 - 0.055 * intel;

    let second = count * 2.4;


    // DPS

    let dps = wall / second;


    return {

        wall,
        gate,
        count,
        second,
        dps

    };

}


function showResult() {

    let a = calcSiege(

        typeA.value,
        Number(powerA.value),
        Number(intelA.value),
        Number(costA.value),
        styleA.value,
        weaponA.value,
        Number(soulA.value)

    );


    let b = calcSiege(

        typeB.value,
        Number(powerB.value),
        Number(intelB.value),
        Number(costB.value),
        styleB.value,
        weaponB.value,
        Number(soulB.value)

    );


    // 簡易表計算

    let diffWall = a.wall - b.wall;
    let diffDps = a.dps - b.dps;


    document.getElementById("result").innerHTML = `

<table>

<tr>
<th></th>
<th>攻城ダメージ</th>
<th>攻城速度</th>
<th>DPS</th>
</tr>


<tr>

<th>武将A</th>

<td class="damage-box">

壁 ${a.wall.toFixed(2)}%<br>
城門 ${a.gate.toFixed(2)}%

</td>


<td class="speed-box">

${a.count.toFixed(2)}c<br>
${a.second.toFixed(2)}秒

</td>


<td class="dps-box">

${a.dps.toFixed(2)}

</td>

</tr>



<tr>

<th>武将B</th>

<td class="damage-box">

壁 ${b.wall.toFixed(2)}%<br>
城門 ${b.gate.toFixed(2)}%

</td>


<td class="speed-box">

${b.count.toFixed(2)}c<br>
${b.second.toFixed(2)}秒

</td>


<td class="dps-box">

${b.dps.toFixed(2)}

</td>

</tr>


</table>

`;



document.getElementById("simpleTable").innerHTML = `


<table>

<tr>

<th>比較</th>
<th>武将A</th>
<th>武将B</th>

</tr>


<tr>

<th>壁ダメ</th>

<td>
${a.wall.toFixed(2)}%
</td>

<td>
${b.wall.toFixed(2)}%
</td>

</tr>



<tr>

<th>攻城速度</th>

<td>
${a.count.toFixed(2)}c
</td>

<td>
${b.count.toFixed(2)}c
</td>

</tr>



<tr>

<th>DPS</th>

<td>
${a.dps.toFixed(2)}
</td>

<td>
${b.dps.toFixed(2)}
</td>

</tr>



<tr>

<th>差</th>

<td colspan="2">

壁 ${diffWall.toFixed(2)}%
<br>

DPS ${diffDps.toFixed(2)}

</td>

</tr>


</table>


`;

}


function update() {

    showResult();

}

typeA.onchange = update;
powerA.onchange = update;
intelA.onchange = update;
costA.onchange = update;
styleA.onchange = update;
weaponA.onchange = update;
soulA.onchange = update;

typeB.onchange = update;
powerB.onchange = update;
intelB.onchange = update;
costB.onchange = update;
styleB.onchange = update;
weaponB.onchange = update;
soulB.onchange = update;

update();
