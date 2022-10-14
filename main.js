const image = document.querySelector("#padlockImage");
const inputs = document.querySelector("#inputs");
const firstDigit = document.querySelector("#number1");
const secondDigit = document.querySelector("#number2");
const thirdDigit = document.querySelector("#number3");
const tryButton = document.querySelector("#btnTry");
const puzzleSolved = document.querySelector(".solved");
const successText = puzzleSolved.querySelector("h3");
const resetButton = document.querySelector("#btnReset");
const errorWarning = document.querySelector("#error");

let attempts = 1;

tryButton.addEventListener( "click", handleTryClick )
resetButton.addEventListener("click", handleResetClick )
document.addEventListener( 'keypress', resetWithEnter );

function handleTryClick (event) 
{
    event.preventDefault();

    const wereNumbersDigited = verifyNumbersWereDigited()

    if(wereNumbersDigited)
    {
        const hasPuzzleBeenSolved = verifyPuzzleSolve();

        if(hasPuzzleBeenSolved)
        {
            changeScreenElements();
            changePadlockImage();
    
            switch (attempts)
            {
                case 1:
                    successText.innerText = `You opened it in ${attempts} attempt!`;
                    break;
                default:
                    successText.innerText = `You opened it in ${attempts} attempts!`;
            }
        }
        else
        {
            resetInputValues();
            attempts++;
        }
    }    
}

function handleResetClick () 
{
    changeScreenElements();
    changePadlockImage();
    resetInputValues();

    attempts = 1;
}

function resetWithEnter (event) 
{
    if(event.key === "Enter" && tryButton.classList.contains('hide'))
    {
        handleResetClick();
    }
}

function verifyNumbersWereDigited () 
{
    const firstDigitValue = firstDigit.value;
    const secondDigitValue = secondDigit.value;
    const thirdDigitValue = thirdDigit.value;

    if(firstDigitValue == "" || secondDigitValue == "" || thirdDigitValue == "")
    {
        errorWarning.style.display = "block";
        addShakeElementAnimation(inputs);
        return false;
    }
    else 
    {
        errorWarning.style.display = "none";
        removeShakeElementAnimation(inputs);
        return true;
    }
}

function verifyPuzzleSolve () 
{
    const firstDigitNumber = Number(firstDigit.value);
    const secondDigitNumber = Number(secondDigit.value);
    const thirdDigitNumber = Number(thirdDigit.value);

    if(firstDigitNumber == 3 && secondDigitNumber == 9 && thirdDigitNumber == 4 )
    {
        removeShakeElementAnimation(image);
        return true;
    }
    else
    {
        addShakeElementAnimation(image);
        return false;
    }
}

function changePadlockImage () 
{
    if(image.src.match("./assets/lock.png"))
    {
        image.src = "./assets/unlock.png";
    }
    else
    {
        image.src = "./assets/lock.png";
    }
}

function changeScreenElements ()
{
    tryButton.classList.toggle("hide");
    puzzleSolved.classList.toggle("hide");
}

function resetInputValues ()
{
    firstDigit.value = "";
    secondDigit.value = "";
    thirdDigit.value = "";
}

function addShakeElementAnimation(element)
{
    if(element.classList.contains('shake'))
    {
        element.classList.remove('shake');
        window.setTimeout(function(){
            element.classList.add('shake')
        }, 50);
    }
    else
    {
        element.classList.add('shake');
    }
}

function removeShakeElementAnimation(element)
{
    if(element.classList.contains('shake'))
    {
        element.classList.remove('shake');
    }
}