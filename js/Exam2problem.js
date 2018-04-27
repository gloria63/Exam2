function MenuChoice()
{
    if (document.getElementById("menu").value =="Display Category List")
    {
         document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value =="Add Category Data")
    {
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value =="Update Description")
    {
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value =="Delete Customer Data")
    {
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value =="About")
    {
        document.getElementById("section5").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
    }
    else 
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    
}

function GetCategories()
{
   var objRequest = new XMLHttpRequest(); //Create AJAX request object

   //Create URL and Query string
   var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";

   //Checks that the object has returned data
   objRequest.onreadystatechange = function()
   {
      if (objRequest.readyState == 4 && objRequest.status == 200)
      {
        var output3 = JSON.parse(objRequest.responseText);
        GenerateOutput1(output3);
      }
   }

   //Initiate the server request
   objRequest.open("GET", url, true);
   objRequest.send();
}

function GenerateOutput1(result3)
{
 var count = 0;
 var displaycategories = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";


 //Loop to extract data from the response object
 for (count = 0; count < result3.GetAllCategoriesResult.length; count++)
 {
 displaycategories += "<tr><td>" + result3.GetAllCategoriesResult[count].CID + "</td><td>" + result3.GetAllCategoriesResult[count].CName  + "</td><td>" + result3.GetAllCategoriesResult[count].CDescription + "</td></tr>";

 }
 displaycategories += "</table>";
 document.getElementById("categorydisplay").innerHTML = displaycategories;

}


function CreateCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    //Collect Customer data from web page
    var category = document.getElementById("category").value;
    var categorydescription = document.getElementById("catdescription").value;
    
    //Create the parameter string
    var newcategory = '{"CName":"' + category + '","CDescription":"' + categorydescription +'"}';
    
    //Checking for AJAx operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}



function UpdateDescription()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    //Collect Customer data from web page
    var categoryid = document.getElementById("categoryid").value;
    var description = document.getElementById("description").value;
    
    //Create the parameter string
    var updatdescription = '{"CID":"' + categoryid + '","CDescription":"' + description + '"}';
    
    //Checking for AJAx operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result1 = JSON.parse(objRequest.responseText);
            OperationResult1(result1);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(updatdescription);
}

function OperationResult1(output1)
{
    if (output1.WasSuccessful == 1)
    {
        document.getElementById("result1").innerHTML = "The operation was successful!";
    }
    else if (output1.WasSuccessful == 0)
    {
        document.getElementById("result1").innerHTML = "The operation was not successful!" + "<br>" + "Operation failed with an unspecified error";
    }
    else if (output1.WasSuccessful == -2)
    {
        document.getElementById("result1").innerHTML = "The operation was not successful!" + "<br>" + "Operation failed because the data string supplied could not be deserialized into the service object";
    }
    else
    {
        document.getElementById("result1").innerHTML = "The operation was not successful!" + "<br>" + "Operation failed because a record with the supplied Category ID could not be found";
    }
}



function DeleteCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    url += document.getElementById("categoryid2").value;

    
    //Checking for AJAx operation return
    objRequest.onreadystatechange = function()
    {
        
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            alert("Hello! You are about to delete this category!");
            var result2 = JSON.parse(objRequest.responseText);
            OperationResult2(result2);
        }
    }
    
    //Start AJAX request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function OperationResult2(output2)
{
    if (output2.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("result2").innerHTML = "The operation was successful!";
    }
    else if (output2.DeleteCategoryResult.WasSuccessful == 0)
    {
        document.getElementById("result2").innerHTML = "The operation was not successful!";
    }
    else
    {
        document.getElementById("result2").innerHTML = "The operation was not successful!" + "<br>" + output2.Exception;
    }
}