/**
 * Created by nancy on 15-2-26.
 */
function personController($scope) {
    $scope.firstName = "John",
        $scope.lastName = "Doe",
        $scope.fullName=function(){
            return $scope.firstName+""+$scope.lastName;
        }
}