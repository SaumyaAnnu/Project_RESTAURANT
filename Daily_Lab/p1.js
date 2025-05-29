
function changecolor()
{
    document.body.style.backgroundColor="cornflowerblue";
}
function abc()
{

    var retconfirm=confirm("Wanna come to NIT SRINAGAR?")
    if(retconfirm==true)
    {
        document.write("WELCOME TO NIT SRINAGAR.HOPE YOU FIND GOOD ROADS AND INFRASTRUCTURE!");
        return true;
    }
    else
    {
        document.write("Bye Bye then!");
        return false;
    }
}