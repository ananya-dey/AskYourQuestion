var app = angular.module('myApp', ['ngRoute']);


//route for pages
app.config(function($routeProvider){
	$routeProvider
	//route for list of questions
	.when('/Questions',{
		templateUrl: 'pages/questionList.html',
		controller: 'QusListController'
	})
	//route for detail page of questions
	.when('/:questionTitle',{
		templateUrl: 'pages/questionDetail.html',
		controller: 'QusDetailController'
	})
	.otherwise({
		redirectTo: '/Questions'
	});
});


//Controller for questionList page
app.controller('QusListController', function($scope,$http){
	
	$scope.QuestionList = [];
		
	// add question
	$scope.AskQuestion = function(){
		var newid = $scope.QuestionList.length;
		newid++;
		
		if(!$scope.TextQuestion)
		{return;}
		
		$scope.QuestionList.push(
			{id:newid, qus1:$scope.TextQuestion}
		);	
		$scope.TextQuestion = "";	
	}
	
	//fetching json data
	$http.get('questions.json').success(function(data) {
        $scope.questions = data;
    });
  	
});

//Controller for question detail page
app.controller('QusDetailController',function($scope,$routeParams,$http){

	//fetching json data
	$scope.qus = $routeParams.questionTitle;

	$http.get('questions.json').success(function(data) {
	    $scope.x = data.filter(function(entry){
	      return entry.qus === $scope.qus;
	    })[0];       
	});


	//in this section comments are shown and added
    $scope.ShowComment = [];

    $scope.AddComment = function(){
		var newid = $scope.ShowComment.length;
		newid++;
		
		if(!$scope.TextComment)
		{return;}
		
		$scope.ShowComment.push(
			{id:newid, cmnt:$scope.TextComment}
		);
		$scope.TextComment = "";
	}
	
	//in this section answers are shown and added
	$scope.ShowAnswer = [];

    $scope.GiveAnswer = function(){
		var newid = $scope.ShowAnswer.length;
		newid++;
		
		if(!$scope.TextAnswer)
		{return;}
		
		$scope.ShowAnswer.push(
			{id:newid, ans:$scope.TextAnswer}
		);
		$scope.TextAnswer = "";
	}
	
});



