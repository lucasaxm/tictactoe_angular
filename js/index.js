var application = angular.module('TicTacToe',[]);

application.controller('BoardController',function($scope) {
    
    $scope.gameIsOver = false;
    $scope.userScore = 0;
    $scope.botScore = 0;
    
    $scope.clearScore = function(){
        $scope.userScore = 0;
        $scope.botScore = 0;
    };
    
    $scope.init = function(){
        $(".square").html("");
        $scope.availableMoves = ["00","01","02","10","11","12","20","21","22"];
        $scope.userMoveSymbol = "";
        $scope.botMoveSymbol = "";
        $scope.gameIsOver = false;
        $scope.winner = null;
        whoStarts();
    };
    
    $scope.init();
    
    $scope.move = function (row, column){
        if (gameIsOver()) {
            return;
        }else if(doUserMove(row,column)){
            if (!gameIsOver()) {
                doBotMove();
                if (gameIsOver()) {
                    return;
                }
            }
            else{
                return;
            }
        }else{
            alert("Unavailable move.");
            return;
        }
    };
    
    function whoStarts(){
        if ((Math.floor(Math.random() * 10))%2){
            $scope.userMoveSymbol = "X";
            $scope.botMoveSymbol = "O";
            doBotMove();
        }
        else{
            $scope.userMoveSymbol = "O";
            $scope.botMoveSymbol = "X";
        }
    }
    
    function validateMove(coordinates) {
        if ($scope.availableMoves.length==0) {
            return 0;
        } else {
            var index = $scope.availableMoves.indexOf(coordinates);
            if (index == -1){
                return 0;
            }
            $scope.availableMoves = _.without($scope.availableMoves,coordinates);
            return 1;
        }
    }
    
    function doBotMove() {
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        var coordinates = ""+row+col;
        while (!validateMove(coordinates)){
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
            coordinates = ""+row+col;
        }
        $(".row>#square"+coordinates).html($scope.botMoveSymbol);
    }
    
    function doUserMove(row,col) {
        var coordinates = ""+row+col;
        if (validateMove(coordinates)){
            $(".row>#square"+coordinates).html($scope.userMoveSymbol);
            return 1;
        }else{
            return 0;
        }
    }
    
    function gameIsOver(){
        if ( ($scope.gameIsOver) || ($scope.winner=getWinner()) || ($scope.availableMoves.length==0) ){
            $scope.gameIsOver = true;
        }
        return $scope.gameIsOver;
    }
    
    function getWinner(){
        if ($scope.winner) {
            return $scope.winner;
        } else {
            var i,j;
            var symbol;
            var rows = ["","",""];
            var collumns = ["","",""];
            var diagonals = ["",""];
            for (i = 0; i<3; i++) {
                for (j = 0; j<3; j++){
                    symbol = $(".row>#square"+i+j).html();
                    rows[i]+=symbol;
                    collumns[j]+=symbol;
                    if (i==j){
                        diagonals[0]+=symbol;
                    }
                    if ((i==0 && j==2) || (i==1 && j==1) || (i==2 && j==0)){
                        diagonals[1]+=symbol;
                    }
                }
            }
            
            var userWinnerString = $scope.userMoveSymbol+$scope.userMoveSymbol+$scope.userMoveSymbol;
            var botWinnerString = $scope.botMoveSymbol+$scope.botMoveSymbol+$scope.botMoveSymbol;
            
            if ((_.contains(rows, userWinnerString))
            || (_.contains(collumns, userWinnerString))
            || (_.contains(diagonals, userWinnerString))){
                $scope.userScore++;
                return $scope.userMoveSymbol;
            }
             
            if ((_.contains(rows, botWinnerString))
            || (_.contains(collumns, botWinnerString))
            || (_.contains(diagonals, botWinnerString))){
                $scope.botScore++;
                return $scope.botMoveSymbol;
            }
            
            return null;
        }
    }
    
    // function showGameOverMessage(){
    //     if ($scope.winner === $scope.userMoveSymbol)
    //         alert("YOU WIN.");
    //     else if ($scope.winner === $scope.botMoveSymbol)
    //         alert("YOU LOST.");
    //     else
    //         alert("DRAW.");
    // }
});

