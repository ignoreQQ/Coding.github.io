// 儲存程式題目的資料
let problems = [
    // 範例資料格式
    // {
    //     id: 1,
    //     title: "題目1",
    //     description: "題目描述",
    //     code: "程式碼內容"
    // }
];

// DOM 元素
const problemList = document.getElementById('problemList');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('codeModal');
const modalTitle = document.getElementById('modalTitle');
const codeContent = document.getElementById('codeContent');
const closeBtn = document.querySelector('.close');

// 新增程式題目的函數
function addProblem(problem) {
    if (!problem.language) {
        problem.language = 'c'; // 預設為 C 語言
    }
    problems.push(problem);
    renderProblems();
}

// 渲染題目列表
function renderProblems(filteredProblems = problems) {
    problemList.innerHTML = '';
    filteredProblems.forEach(problem => {
        const problemElement = document.createElement('div');
        problemElement.className = 'problem-item';
        
        // 使用正則表達式匹配所有 ca 開頭接著4個數字的文字
        const title = problem.title.replace(/(ca\d{4})/gi, '<span class="highlight-green">$1</span>');
        
        problemElement.innerHTML = `
            <h3>${title}</h3>
            <p>${problem.description}</p>
        `;
        problemElement.addEventListener('click', () => showCode(problem));
        problemList.appendChild(problemElement);
    });
}

// 顯示程式碼的函數
function showCode(problem) {
    modalTitle.textContent = problem.title;
    codeContent.textContent = problem.code;
    modal.style.display = 'block';
    
    // 重置複製按鈕狀態
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.classList.remove('success');
    copyBtn.innerHTML = '<i class="fas fa-copy"></i> 複製程式碼';
}

// 搜尋功能
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProblems = problems.filter(problem => 
        problem.title.toLowerCase().includes(searchTerm) ||
        problem.description.toLowerCase().includes(searchTerm)
    );
    renderProblems(filteredProblems);
});

// 關閉模態視窗
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


// 在原有的 JavaScript 檔案開頭加入以下程式碼
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

// 檢查本地儲存的主題設定
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

// 切換主題的函數
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// 監聽開關切換事件
toggleSwitch.addEventListener('change', switchTheme);

// 在原有的 JavaScript 中加入以下代碼
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeSidebar = document.querySelector('.close-sidebar');
    const hasSubmenu = document.querySelector('.has-submenu');
    
    // 開啟側邊選單
    hamburger.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });

    // 關閉側邊選單
    function closeSidebarMenu() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    closeSidebar.addEventListener('click', closeSidebarMenu);
    overlay.addEventListener('click', closeSidebarMenu);

    // 展開/收合子選單
    hasSubmenu.addEventListener('click', (e) => {
        const submenu = hasSubmenu.querySelector('.submenu');
        submenu.classList.toggle('active');
        const icon = hasSubmenu.querySelector('.fa-chevron-down');
        icon.style.transform = submenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
    });

    // 程式語言篩選
    const languageLinks = document.querySelectorAll('[data-language]');
    languageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const language = e.target.dataset.language;
            filterProblemsByLanguage(language);
            closeSidebarMenu();
        });
    });

    const copyBtn = document.getElementById('copyBtn');
    
    // 複製程式碼功能
    copyBtn.addEventListener('click', async function() {
        const codeText = codeContent.textContent;
        
        try {
            await navigator.clipboard.writeText(codeText);
            
            // 變更按鈕狀態顯示成功
            copyBtn.classList.add('success');
            copyBtn.innerHTML = '<i class="fas fa-check"></i> 已複製';
            
            // 2秒後恢復原狀
            setTimeout(() => {
                copyBtn.classList.remove('success');
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> 複製程式碼';
            }, 2000);
            
        } catch (err) {
            console.error('複製失敗:', err);
            alert('複製失敗，請手動複製');
        }
    });
});

// 根據程式語言篩選問題
function filterProblemsByLanguage(language) {
    const filteredProblems = problems.filter(problem => problem.language === language);
    renderProblems(filteredProblems);
}

// 範例題目
addProblem({
    id: 201,
    title: "ca0201 Hello World!",
    description: "這是 C 語言課程的第一步，請用 C 語言在螢幕中列印出 \"Hello World!\" 這句話。",
    language: "c",
    code: `#include <stdio.h>

int main()
{
    printf("Hello World!");

    return 0;
}`
});

addProblem({
    id: 202,
    title: "ca0202 Input and Output 01",
    description: "請設計一個程式，此程式要求使用者輸入一整數(資料型態為int)，並將使用者輸入的數字連續輸出三次至螢幕上。",
    language: "c",
    code: `#include <stdio.h>

int main()
{
    int input;
    
    scanf( "%d", &input);
    
    printf( "%d%d%d", input,input,input);
    
    return 0;
}`
});

addProblem({
    id: 203,
    title: "ca0203 Input and Output 02",
    description: "請設計一個程式，此程式要求使用者依序輸入兩整數(資料型態皆為int)，並將使用者輸入的兩個數字倒序輸出至螢幕上。",
    language: "c",
    code: `#include <stdio.h>

int main()
{
    int num1, num2;
    
    scanf("%d", &num1);
    scanf("%d", &num2);
    
    printf("%d%d", num2, num1);
    
    return 0;
}`
}); 

addProblem({
    id: 204,
    title: "ca0204 Input and Output 03",
    description: "請設計一個程式，此程式要求使用者輸入三個整數依序為a,b,c(資料型態皆為int)，並將使用者輸入的三個數字依b,c,a的順序輸出(需換行)至螢幕。",
    language: "c",
    code: `#include <stdio.h>

int main()
{
    int num1, num2, num3;
    
    scanf("%d", &num1);
    scanf("%d", &num2);
    scanf("%d", &num3);
    
    printf("%d\\n%d\\n%d\\n", num2, num3,num1);
    
    return 0;
}`
}); 

addProblem({
    id: 205,
    title: "ca0205 等腰直角三角形",
    description: "請設計一個程式，輸入一個整數a，輸出一個以 a 填充，兩腰長為 3 的等腰直角三角形",
    language: "c",
    code: `#include <stdio.h>

int main()
{
    int num;
    
    scanf("%d", &num);
    printf("%d\\n%d%d\\n%d%d%d\\n", num, num, num, num, num, num);
    
    return 0;
}`
}); 

addProblem({
    id: 206,
    title: "ca0206 ASCII ART",
    description: "ASCII ART是一種主要依靠電腦ASCII字元來表達圖像的藝術形式，主要出現在早期的電腦網路，電子郵件中，現今在台大PTT BBS仍常看到，請寫一個程式，輸入一個數字 a ，輸出一個用數字 a 填充 π 的符號(11 * 5)。",  
    language: "c",
    code: `#include <stdio.h>

int main()
{
    int num;
    scanf("%d", &num);
    
    printf("%d%d%d%d%d%d%d%d%d%d \\n", num, num, num, num, num, num, num, num, num, num);
    printf("---%d--%d \\n", num, num);
    printf("--%d---%d---%d \\n", num, num, num);
    printf("-%d----%d--%d \\n", num, num, num);
    printf("%d------%d%d", num, num, num);
    
    return 0;
}`
}); 

addProblem({
    id: 301,
    title: "ca0301 Rectangle area",
    description: "考慮輸入的兩個正整數 a, b。請撰寫一個程式計算並輸出邊長為a和b的長方形面積。",
    language: "c",
    code: `#include <stdio.h>

int main()
{
    int num1, num2;
    scanf("%d %d",&num1, &num2);
    printf("%d", num1*num2);

    return 0;
}`
}); 

addProblem({
    id: 302,
    title: "ca0302 Unit conversion 1",
    description: "常見的計算機儲存單位有KB、MB、GB，其關係如下： ★ 1 KB (Kilo Byte) = 1024 Byte ★ 1 MB (Mega Byte) = 1024 KB ★ 1 GB (Giga Byte) = 1024 MB 請撰寫一個程式使其輸入 KB 與 GB 後，將其換算MB輸出。此題保證KB輸入為1024的倍數。",
    language: "c",
    code: `#include <stdio.h>

int main()
{
    int kilo, mega;
    
    scanf("%d %d", &kilo, &mega);
    
    printf("%dMB\\n", kilo / 1024);
    printf("%dMB\\n", mega * 1024);
    
    return 0;
}`
}); 

addProblem({
    id: 304,
    title: "ca0304 Direct mapping",
    description: "在記憶體快取存取方法裡面有一種簡單的方式為Direct mapping（直接映射）假定目前使用Decimal digit（十進位數）其計算方式為輸入記憶體位置 a 與block（區塊）總數 b位置a除block總數b後得到餘數即為cache中block的index（索引）號碼。index代表cache中的block編號。得到商數則為cache中block的Tag（標籤）。Tag代表所需的位址資訊，用於判別cache中的資料是否為所需。請撰寫一個程式使其輸入 位置a 與 block總數b 後，輸出其存放至cache的index與Tag。",
    language: "c",
    code: `#include <stdio.h>

int main()
{
    int num1, num2;
    scanf("%d %d",&num1, &num2);
    printf("%d \\n", num1 % num2);
    printf("%d", num1 / num2);
    return 0;
}
`
}); 

addProblem({
    id: 306,
    title: "ca0306 矩陣運算",
    description: "給兩個2*2的矩陣，請算出矩陣相乘的結果",
    language: "c",
    code: `#include <stdio.h>

int main()
{
    int arr1[2][2], arr2[2][2], ans[2][2];
    
    // Array 1 輸入
    
    scanf("%d %d\\n", &arr1[0][0], &arr1[0][1]);
    scanf("%d %d\\n", &arr1[1][0], &arr1[1][1]);

    // Array 2 輸入
    
    scanf("%d %d", &arr2[0][0], &arr2[0][1]);
    scanf("%d %d", &arr2[1][0], &arr2[1][1]);
    
    // Answer 計算
    
    ans[0][0] = arr1[0][0] * arr2[0][0] + arr1[0][1] * arr2[1][0];
    ans[0][1] = arr1[0][0] * arr2[0][1] + arr1[0][1] * arr2[1][1];
    ans[1][0] = arr1[1][0] * arr2[0][0] + arr1[1][1] * arr2[1][0];
    ans[1][1] = arr1[1][0] * arr2[0][1] + arr1[1][1] * arr2[1][1];
    
    // Answer 輸出
    
    for (int i = 0; i < 2; i++) {
        for(int j = 0; j < 2; j++ ){
            printf("%d ", ans[i][j]);
        }
        printf("\\n");
    }
    
    return 0;
}`
}); 

addProblem({
    id: 308,
    title: "ca0308 秒數轉換器",
    description: "我們在處理資料的時候，時常會需要處理與時間相關的資料，例如計算平均時間，或是時間的中位數等等。 通常，我們會換成同樣單位再去做計算，會比較簡單，例如時間資料的格式為mm:ss，我們可以把時間都換成秒。 在本作業中，請利用c語言寫一個程式將輸入一個時間mm:ss, 轉換為秒數。",
    language: "c",
    code: `#include <stdio.h>

int main()
{
    int min,  sec;
    
    scanf("%d:%d", &min, &sec);
    
    printf("%d", min * 60 + sec);
    
    return 0;
}`
}); 

addProblem({
    id: 309,
    title: "ca0309 Binary to Decimal Converter",
    description: "給一個以二進位表示的四位數字a1,a2,a3,a4請將這四位數字轉換為一個10進位的數字",
    language: "c",
    code: `#include <stdio.h>
#include <math.h>

int main()
{
    int ans, num1, num2, num3, num4;
    
    scanf("%d %d %d %d", &num1, &num2, &num3, &num4);
    
    ans = num1 * pow(2, 3) + num2 * pow(2, 2) + num3 * pow(2, 1) + num4 * pow(2, 0);
    
    ans = (int)ans;
    
    printf("%d", ans);
    
    return 0;
}`
}); 

addProblem({
    id: 310,
    title: "ca0310 number system converter",
    description: "上一題 是將二進位轉換成10進位 本題希望將 x 進位轉換成10進位 x 先給一個數字 代表進制 接著給一個以 x 進位表示的四位數字 請將這四位數字轉換為一個10進位的數字",
    language: "c",
    code: `#include <stdio.h>
#include <math.h>

int main()
{
    int ans, power, num1, num2, num3, num4;
    
    scanf("%d %d %d %d %d", &power, &num1, &num2, &num3, &num4);
    
    ans = num1 * pow(power, 3) + num2 * pow(power, 2) + num3 * pow(power, 1) + num4 * pow(power, 0);
    
    ans = (int)ans;
    
    printf("%d", ans);
    
    return 0;
}`
}); 

addProblem({
    id: 401,
    title: "ca0401 overflow 1",
    description: "在計算機中，int 型別的容量是有限的。如果超出範圍，則會發生數值溢出。 integer overflow 是指： 如果一個 int 變數存儲了 2147483647，再加一會變成 -2147483648。 現在考慮輸入兩個整數 A 與 B，其中 -2147483649 < A < 2147483648，-1 < B < 2147483648。 請編寫一個程式來判斷 A + B 是否會發生溢出。 若沒有發生溢出，輸出 1。 若發生溢出，輸出 0。 解決此問題，可以使用 bool 型別，並需要包含以下頭文件：#include <stdbool.h>。",
    language: "c",
    code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

int main()
{
    int num1, num2;
    
    scanf("%d %d",&num1, &num2);
    
    if(num1 > 2147483647 - num2){
        printf("0");
    }
    else{
        printf("1");
    }
    
    return 0;
}
`
}); 

addProblem({
    id: 402,
    title: "ca0402 overflow 2",
    description: "根據 overflow 1 現在考慮Ｂ < 0可能發生的integer underflow integer overflow 是指： 如果一個 int 變數存儲了 2147483647，再加一會變成 -2147483648。 integer underflow 是指： 如果一個 int 變數存儲了 -2147483648，再減一會變成 2147483647。 現在考慮輸入兩個整數 A 與 B，其中 -2147483649 < A < 2147483648，-2147483649 < B < 2147483648。 請編寫一個程式來判斷 A + B 是否會發生溢出。 若沒有發生溢出，輸出 1。 若發生溢出，輸出 0。 解決此問題，可以使用 bool 型別，並需要包含以下頭文件：#include <stdbool.h>。",
    language: "c",
    code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

int main()
{
    int num1, num2;
    
    scanf("%d %d",&num1, &num2);
    if(num1 > 0 && num2 > 0){
        if(num1 > 2147483647 - num2){
            printf("0");
        }
        else{
            printf("1");
        }
    }
    else{
        if(num1 < -2147483648 - num2){
            printf("0");
        }
        else{
            printf("1");
        }
    }

    return 0;
}`
}); 

addProblem({
    id: 403,
    title: "ca0403 半加器(half adder)",
    description: "半加器(half adder)是一個可以用來做二元運算加法的部件，其中A與B為輸入值，表示我們要拿來相加的兩個位元，而Sum與Carry為輸出，其中Sum為兩數之和，而Carry為是否進位。 在二元運算中，現在考慮輸入兩個數字 A 與 B，其中 A,B= 0 or 1。 請編寫一個程式來計算二元運算加法 A + B。",
    language: "c",
    code: `#include <stdio.h>
int main()
{
  int num1, num2;
  
  scanf("%d %d", &num1, &num2);
  if(num1 == 0){
    if(num2 == 0){
      printf("Carry=0\\n");
      printf("Sum=0");
    }
    else{
      printf("Carry=0\\n");
      printf("Sum=1");
    }
  }
  else{
    if(num2 == 0){
      printf("Carry=0\\n");
      printf("Sum=1");
    }
    else{
      printf("Carry=1\\n");
      printf("Sum=0");
    }
  }
  
  return 0;
}`
}); 

addProblem({
    id: 404,
    title: "ca0404 判斷考試結果",
    description: "請寫一個程式判斷考試是否及格，假設分數為score，若score>= 60，則印出pass! 若score< 60，則印出fail!",
    language: "c",
    code: `#include <stdio.h>
int main()
{
  int score = 0;
  
  scanf("%d",&score);
  
  if(score >= 60){
    printf("pass!");
  }
  else{
    printf("fail!");
  }
  
  return 0;
}`
}); 

addProblem({
    id: 405,
    title: "ca0405 判斷季節",
    description: "1～3月是春天（Spring），4～6月是夏天（Summer），7～9月是秋天（Autumn），10～12月是冬天（Winter） 輸入： 一個整數（1-12）來代表月份 輸出： 對應的（英文）季節是屬於春夏秋冬哪個季節",
    language: "c",
    code: `#include <stdio.h>

int main()
{
    int season;
    scanf("%d", &season);
    
    if(season <= 12 && season >= 1){
        if(season >= 1 && season <=3){
            printf("Spring");
        }
        else{
            if(season >= 4 && season <= 6){
                printf("Summer");
            }
            else{
                if (season >= 7 && season <= 9){
                    printf("Autumn");
                }
                else{
                    if(season >= 10 && season <= 12){
                        printf("Winter");
                    }
                }
            }
        }
    }
    else{
        printf("Error");
    }
    
    return 0;
}`
}); 

addProblem({
    id: 406,
    title: "ca0406 判斷直角",
    description: "給 a,b,c 三個數字請判斷是否為直角三角形 如果是請輸出1 相反則輸出0",
    language: "c",
    code: `#include <stdio.h>
#include <math.h>
int main()
{
    int ans, num, num1, num2, num3;
    
    scanf("%d %d %d",&num1, &num2, &num3);
    
    //比較num1 & num2 & num3
    
    if(num1 > num2){
        num = num2;
        num2 = num1;
        num1 = num;
    }
    if(num1 > num3){
        num = num3;
        num3 = num1;
        num1 = num;
    }
    if(num2 > num3){
        num = num3;
        num3 = num2;
        num2 = num;
    }
    
    if(pow(num3,2) == pow(num1,2) + pow(num2,2)){
        printf("1");
    }
    else{
        printf("0");
    }
    
    return 0;
}`
}); 

addProblem({
    id: 407,
    title: "ca0407 三人排序",
    description: "問題說明 商店街 Iphone 16 開賣，老闆發的號碼牌為整數，A、B、C三人各自抽取了號碼牌，請根據號碼牌的大小讓老闆決定出貨順序。 輸入三個整數A,B,C 請輸出由小排到大的結果。",
    language: "c",
    code: `#include <stdio.h>
#include <math.h>
int main()
{
    int ans, num, num1, num2, num3;
    
    scanf("%d %d %d",&num1, &num2, &num3);
    
    //比較num1 & num2 & num3
    
    if(num1 > num2){
        num = num2;
        num2 = num1;
        num1 = num;
    }
    if(num1 > num3){
        num = num3;
        num3 = num1;
        num1 = num;
    }
    if(num2 > num3){
        num = num3;
        num3 = num2;
        num2 = num;
    }
    
    printf("%d %d %d", num1, num2, num3);
    
    return 0;
}`
}); 

addProblem({
    id: 408,
    title: "ca0408",
    description: "",
    language: "c",
    code: ``
}); 

addProblem({
    id: 409,
    title: "ca0409 判斷整除",
    description: "在一個除法運算中，若 被除數 可以被 除數 整除，那麼得到的 餘數 會為 0 。 輸入： 兩個不為零的整數 a 和 b 。 輸出： (True/False) 和一個整數，其中有兩種狀況： Case1：若 a 可以被 b 整除，輸出 True，整數為得到的 商 。 Case2：若 a 無法被 b 整除，輸出 False，整數為得到的 餘數 。",
    language: "c",
    code: `#include <stdio.h>
#include <math.h>
int main()
{
    int num1, num2;
    
    scanf("%d %d", &num1, &num2);
    if(num1 % num2 == 0){
        printf("True ");
        printf("%d", num1 / num2);
    }
    else{
        printf("False ");
        printf("%d", num1 % num2);
    }
    
    
    return 0;
}`
}); 

addProblem({
    id: 410,
    title: "ca0410 雞羊問題",
    description: "問題說明 有一個牧場，牧場內有雞(chicken)也有羊(sheep)， 輸入： 共有兩個整數，第一個整數n為牧場內共有n隻動物，第二個整數a為動物們共有a隻腳 輸出： 共有兩個整數與一個動物名稱，第一個整數x為有x隻雞，第二個整數y為有y隻羊，動物名稱的部分，請輸出較多動物的名稱，若相同則輸出same",
    language: "c",
    code: `#include <stdio.h>
#include <math.h>
int main()
{
    int animal, foot, chicken, sheep;
    
    scanf("%d %d", &animal, &foot);
    
    //chicken + sheep = animal         
    //chicken = animal - sheep
    //sheep = animal - chicken
    //2 * chicken + 4 sheep = foot     
    //2 * animal + 2 * sheep = foot
    //"sheep = (foot - 2 * animal) /2"
    //4 * animal - 2 * chicken = foot
    //"chicken = (4 * animal - foot) /2"
    
    chicken = (4 * animal - foot) / 2;
    sheep = (foot - 2 * animal) / 2;
    
    if(chicken > sheep){
        printf("%d %d chicken", chicken, sheep);
    }
    if(chicken == sheep){
        printf("%d %d same",chicken, sheep);
    }
    if(chicken < sheep){
        printf("%d %d sheep", chicken, sheep);
    }
    
    return 0;
}`
}); 

addProblem({
    id: 411,
    title: "ca0411 一番賞 1",
    description: "問題說明 商店街滿額可以抽一番賞，有機會得到限定公仔。但是否抽中需要看運氣。其規則如下： 籤筒可能會出現0,1,2,...,20，共21種 如果抽籤時出現20，會取得A賞的限定公仔 如果抽籤時出現5,9,17，會拿到B賞的公仔 如果抽籤時出現1,2,4,7,8,10,12,15,16,19，會拿到C賞的公仔 抽到剩餘的籤，會拿到等級D賞的公仔 請撰寫一個程式，根據你抽到的號碼，輸出你抽到哪種公仔。 輸入格式：1個介於0,1,...,20之間的整數 輸出格式：1個整數。其中 1: 代表你抽到的公仔等級是A賞 2: 代表你抽到的公仔等級是B賞 3: 代表你抽到的公仔等級是C賞 4: 代表你抽到的公仔等級是D賞 建議使用switch-case語法。把上述有列出的編號對應哪種等級公仔的部份分別寫成各自的case，相同結果的編號共用相同程式碼。剩下的沒列出編號的是D賞，寫在default的部份。a",
    language: "c",
    code: `#include <stdio.h>
#include <math.h>
int main()
{
    int num;
    
    scanf("%d", &num);
    
    switch(num){
        case 20:
        
            printf("1");
            break;
        
        case 5:
        case 9:
        case 17:
        
            printf("2");
            break;
            
        case 1:
        case 2:
        case 4:
        case 7:
        case 8:
        case 10:
        case 12:
        case 15:
        case 16:
        case 19:
        
            printf("3");
            break;
            
        default:
            printf("4");
    }
    
    
    return 0;
}`
}); 

addProblem({
    id: 412,
    title: "ca0412 元素週期表",
    description: "問題說明 在國高中時期, 我們背過元素週期表, 其中元素週期表的數字代表為各個元素的 原子序, 且用 CAS族號區分的話, 可以將元素分成 A 和 B 兩族 1A 族有 氫(1), 鋰(3), 鈉(11), 鉀(19), 銣(37), 銫(55), 鍅(87) 2A 族有 鈹(4), 鎂(12), 鈣(20), 鍶(38), 鋇(56), 鐳(88) 7A 族有 氟(9), 氯(17), 溴(35), 碘(53), 砈(85) 8A 族有 氦(2), 氖(10), 氬(18), 氪(36), 氙(54), 氡(86) 現在考慮輸入一個數字 A ，其中 A 為原子序。 請輸出此原子序為哪一族元素, 若不屬於 1A, 2A, 7A, 8A 則輸出 0",
    language: "c",
    code: `#include <stdio.h>
#include <math.h>
int main()
{
	int num;

	scanf("%d",&num);

	switch(num) {
	    case 1:
	    case 3:
	    case 11:
	    case 19:
	    case 37:
	    case 55:
	    case 87:

		    printf("1A");
		    break;

	    case 4:
	    case 12:
	    case 20:
	    case 38:
        case 56:
        case 88:
    
            printf("2A");
            break;
        
        case 9:
        case 17:
        case 35:
        case 53:
        case 85:
    
            printf("7A");
            break;
    
        case 2:
        case 10:
        case 18:
        case 36:
        case 54:
        case 86:
    
            printf("8A");
            break;
            
        default:
            printf("0");
	}

	return 0;
}`
}); 

addProblem({
    id: 413,
    title: "ca0413 薪水結算",
    description: "問題說明小明是一個大學生，想要趁暑假旅遊結束後，去一個電腦展打工，電腦展為期十天，且因為每天的工作內容都不一樣，所以每一天的日薪也都不相同。由於小明的旅遊日開始的第一天跟電腦展開始的第一天重疊，例如若小明花五天旅遊，那麼他就只能從第六天開始打工。假設小明不論玩幾天，他都會參與電腦展剩下的所有打工日，請寫一個程式輸入為小明旅遊的總天數n，輸出為小明打工可以賺到總金額。",
    language: "c",
    code: `#include <stdio.h>
#include <math.h>
int main()
{
	int travel, work, money = 0;
	int salary[10] = {34, 25, 64, 17, 83, 55, 43, 32, 14, 67};
	
	scanf("%d",&travel);
	work = 10 - travel;
	
	for(int i = travel; i < 10; i++){
	    money += salary[i];
	}
	
	printf("%d",money);
	

	return 0;
}`
}); 

addProblem({
    id: 414,
    title: "ca0414 列出質數",
    description: "問題說明 考慮輸入一個數字 N ，其中 N 為 1~30。 若 N 為質數, 則列印出小於等於他的質數, 由大到小列印, 一個數字一行 若 N 為合數, 則列印出 \"It's not in 1~30 or not prime.\"",
    language: "c",
    code: `#include <stdio.h>

int main()
{
    int num;
    
    scanf("%d",&num);
    
    switch(num){
        case 2:
            printf("2");
            break;
        case 3:
            printf("3\\n2");
            break;
        case 5:
            printf("5\\n3\\n2");
            break;
        case 7:
            printf("7\\n5\\n3\\n2");
            break;
        case 11:
            printf("11\\n7\\n5\\n3\\n2");
            break;
        case 13:
            printf("13\\n11\\n7\\n5\\n3\\n2");
            break;
        case 17:
            printf("17\\n13\\n11\\n7\\n5\\n3\\n2");
            break;
        case 19:
            printf("19\\n17\\n13\\n11\\n7\\n5\\n3\\n2");
            break;
        case 23:
            printf("23\\n19\\n17\\n13\\n11\\n7\\n5\\n3\\n2");
            break;
        case 29:
            printf("29\\n23\\n19\\n17\\n13\\n11\\n7\\n5\\n3\\n2");
            break;
        
        default:
        
            printf("It's not in 1~30 or not prime.");
    }
    
    return 0;
}`
}); 

addProblem({
    id: 415,
    title: "ca0415",
    description: "",
    language: "c",
    code: `#include <stdio.h>

int main() {
    int special, spe, top1, top2, top3, num;
    scanf("%d",&special);
    scanf("%d",&spe);
    scanf("%d",&top1);
    scanf("%d",&top2);
    scanf("%d",&top3);
    scanf("%d",&num);
    
    if (num == special){
        printf("10000");
    }
    else if (num == spe){
        printf("2000");
    }
    else if (num == top1 || num == top2 || num == top3){
        printf("800");
    }
    else if (num % 10000 == top2 % 10000 || num % 10000 == top3 % 10000){
        printf("400");
    }
    else if (num % 1000 == top2 % 1000 || num % 1000 == top3 % 1000 ){
        printf("100");
    }
    else {
        printf("0");
    }
    
    return 0;
}

`
}); 

addProblem({
    id: 416,
    title: "ca0416 判斷生肖",
    description: "問題說明 民國元年為鼠年，民國2年為牛，民國3年為虎，...，民國12年為豬， 已知生肖的排序為:鼠、牛、虎、兔、龍、蛇、馬、羊、猴、雞、狗、豬。 輸入： 為一個整數為year 輸出： 對應年份的生肖的英文，mouse, ox, tiger, rabbit, dragon, snake, horse, sheep, monkey, chicken, dog, pig。",
    language: "c",
    code: `#include <stdio.h>

int main() {
    
    int year = 0;
    
    scanf("%d", &year);
    
    if(year % 12 == 1){
        printf("mouse");
    }
    if(year % 12 == 2){
        printf("ox");
    }
    if(year % 12 == 3){
        printf("tiger");
    }
    if(year % 12 == 4){
        printf("rabbit");
    }
    if(year % 12 == 5){
        printf("dragon");
    }
    if(year % 12 == 6){
        printf("snake");
    }
    if(year % 12 == 7){
        printf("horse");
    }
    if(year % 12 == 8){
        printf("sheep");
    }
    if(year % 12 == 9){
        printf("monkey");   
    }
    if(year % 12 == 10){
        printf("chicken");
    }
    if(year % 12 == 11){
        printf("dog");
    }
    if(year % 12 == 0){
        printf("pig");
    }

    
    
    return 0;
}`
}); 

addProblem({
    id: 417,
    title: "ca0417",
    description: "",
    language: "c",
    code: ``
}); 

