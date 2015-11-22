##Introduction:

This is an `ionic-multi-date-picker` bower component, which can be used in any Ionic framework's application. No additional plugins required for this component.

Forked from https://github.com/rajeshwarpatlolla/ionic-datepicker
and fully rewrited.

[Repo with simple ionic-application](https://github.com/DenniLa2/ionic-datepicker-sample-project)

[Home Ionic-multi-date-picker](https://github.com/DenniLa2/ionic-datepicker)

##Prerequisites.

* node.js
* npm
* bower
* gulp

##How to use:

1) In your project repository install the ionic-datepicker using bower

`bower install ionic-multi-date-picker --save`

This will install the latest version released.

2) Give the path of  `ionic-multi-date-picker.bundle.min.js` in your `index.html` file.

````html
<!-- path to ionic/angularjs -->
<script src="lib/ionic-multi-date-picker/dist/ionic-multi-date-picker.bundle.min.js"></script>
````

3) In your application module inject the dependency `ionic-multi-date-picker`, in order to work with the ionic time picker
````javascript
angular.module('mainModuleName', ['ionic', 'ionic-multi-date-picker']){
//
}
````

4) Use the below format in your template's corresponding controller. All parameters are optional.

````javascript
    $scope.datepickerObject = {
      templateType: 'POPUP', // POPUP | MODAL
      header: "Select Dates",
      headerClass: "royal-bg light",
      btnsIsNative: false,
      btnOk: 'OK',
      btnOkClass: 'button-clear cal-green',
      btnCancel: 'ЗАКРЫТЬ',
      btnCancelClass: 'button-clear button-dark',
      btnTodayShow: false,
      btnToday: 'Сегодня',
      btnTodayClass: 'button-positive',
      btnClearShow: false,
      btnClear: 'Очистить',
      btnClearClass: 'button-royal',
      selectType: 'PERIOD', // SINGLE | PERIOD | MULTI
      accessType: 'WRITE', // READ | WRITE
      errorLanguage: 'RU', // EN | RU
      selectedDates: $scope.selectedDates,
      viewMonth: $scope.selectedDates, 
      disabledDates: disabledDates,
      holidays: holidays,
      conflictSelectedDisabled: 'DISABLED', // SELECTED | DISABLED
      closeOnSelect: false,
      mondayFirst: true,
      weekDaysList: weekDaysList,
      monthList: monthList,
      modalHeaderColor: 'bar-positive',
      modalFooterColor: 'bar-positive',
      callback: function (dates) {  
        retSelectedDates(dates);
      }
    };    
````

**$scope.datepickerObject** is the main object, that we need to pass to the directive. The properties of this object are as follows.

**1. templateType** - the type of dialog. Default is `MODAL`
**2. header** 
**3. headerClass** - ionic css classes.
**4. btnsIsNative** - use ionic-popup-native buttons. Default: true.
**5. btnOk** - caption on Ok button.
**6. btnOkClass** - ionic css classes.
**7. btnCancel** - caption on Cancel button.
**8. btnCancelClass** - ionic css classes.
**9. btnTodayShow** - Default false.
**10. btnToday** - caption.
**11. btnTodayClass - ionic css classes.
**12. btnClearShow** - default false.
**13. btnClear** - caption.
**14. btnClearClass** - ionic css classes
**15. selectType** - SINGLE - one date per calendar, PERIOD  - continuous date period, MULTI - random dates. Default `MULTI`.
**16. accessType** - READ | WRITE. Default - `WRITE`.
**17. errorLanguage** - language of user errors. EN | RU. Default `EN`.
**18. selectedDates** - array with javascript dates.
**19. viewMonth** - first viewed month. Default: current or nearest next month with date.
**20. disabledDates** - array with javascript dates of disabled dates.
**21. holidays** - javascript array with holidays
**22. conflictSelectedDisabled** - if selecled dates and disabled dates have the same date - one of them will deleted. `SELECTED` - selected date will store, disabled - deleted. `DISABLED` - disabled date will store, selected - deleted. Default `DISABLED`. 
**23. closeOnSelect** - default false.
**24. mondayFirst** - default true,
**25. weekDaysList**
**26. monthList**
**29. callback**(Mandatory) - This the callback function, which will get array of the selected dates in to the controller. You can define this function as follows.
````javascript
    var retSelectedDates = function (dates) {
      $scope.selectedDates.length = 0;
      for (var i = 0; i < dates.length; i++) {
        $scope.selectedDates.push(angular.copy(dates[i]));
      }
    };
````


**1. ionic-multi-date-picker** is the directive, to which we can pass required vales.

**2. input-obj**(Mandatory) - This is an object. We have to pass an object as shown above.

##Video:
[YouTube](https://youtu.be/RxW628a9U-M)

##Versions:

0.1.0 - forked from https://github.com/rajeshwarpatlolla 

1.0.0 - fully rewrited.

##Contact:
gmail : dennila2@gmail.com

github : https://github.com/dennila2

Comment or Rate it : http://market.ionic.io/plugins/ionicMultiDatePicker