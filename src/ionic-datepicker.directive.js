//By Rajeshwar Patlolla - rajeshwar.patlolla@gmail.com
//https://github.com/rajeshwarpatlolla

(function () {
  'use strict';

  angular.module('ionic-datepicker')
    .directive('ionicDatepicker', IonicDatepicker);

  IonicDatepicker.$inject = ['$ionicPopup', '$ionicModal', 'IonicDatepickerService'];

  function IonicDatepicker($ionicPopup, $ionicModal, IonicDatepickerService) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        inputObj: "=inputObj"
      },
      link: function (scope, element, attrs) {

        function start() {
          initView();
          initDates();
          initCalendarDates();
          initBtns();
          initModal();
          setViewMonth();
          refreshDateList();
        }

        function initView() {

          scope.currentMonth = '';
          scope.currentYear = '';
          //scope.disabledDates = [];

          if (scope.inputObj.isNativeButtons) {
            scope.isNativeButtons = scope.inputObj.isNativeButtons;
          } else {
            scope.isNativeButtons = false;
          }

          //Setting the title, today, close and set strings for the date picker
          scope.titleLabel = scope.inputObj.titleLabel ? (scope.inputObj.titleLabel) : 'Select Date';
          scope.todayLabel = scope.inputObj.todayLabel ? (scope.inputObj.todayLabel) : 'Today';
          scope.closeLabel = scope.inputObj.closeLabel ? (scope.inputObj.closeLabel) : 'Close';
          scope.clearLabel = scope.inputObj.clearLabel ? (scope.inputObj.clearLabel) : 'Clear';
          scope.okLabel = scope.inputObj.okLabel ? (scope.inputObj.okLabel) : 'Set';
          scope.okButtonType = scope.inputObj.okButtonType ? (scope.inputObj.okButtonType) : 'button-stable cal-button';
          scope.todayButtonType = scope.inputObj.todayButtonType ? (scope.inputObj.todayButtonType) : 'button-stable cal-button';
          scope.closeButtonType = scope.inputObj.closeButtonType ? (scope.inputObj.closeButtonType) : 'button-stable cal-button';
          scope.clearButtonType = scope.inputObj.clearButtonType ? (scope.inputObj.clearButtonType) : 'button-stable cal-button';

          scope.templateType = scope.inputObj.templateType ? (scope.inputObj.templateType) : 'popup'; // 'modal'

          scope.showTodayButton = scope.inputObj.showTodayButton ? (scope.inputObj.showTodayButton) : 'true';
          scope.showClear = scope.inputObj.showClear ? (scope.inputObj.showClear) : false;
          scope.closeOnSelect = scope.inputObj.closeOnSelect ? (scope.inputObj.closeOnSelect) : false;

          //scope.errorMsgLabel = scope.inputObj.errorMsgLabel ? (scope.inputObj.errorMsgLabel) : 'Please select a date.';
          scope.modalHeaderColor = scope.inputObj.modalHeaderColor ? (scope.inputObj.modalHeaderColor) : 'bar-stable';
          scope.modalFooterColor = scope.inputObj.modalFooterColor ? (scope.inputObj.modalFooterColor) : 'bar-stable';
          scope.dateFormat = scope.inputObj.dateFormat ? (scope.inputObj.dateFormat) : 'dd-MM-yyyy';

          // Setting the months list. This is useful, if the component needs to use some other language.
          scope.monthsList = [];
          if (scope.inputObj.monthList && scope.inputObj.monthList.length === 12) {
            scope.monthsList = scope.inputObj.monthList;
          } else {
            scope.monthsList = IonicDatepickerService.monthsList;
          }
          // weaklist
          if (scope.inputObj.weekDaysList && scope.inputObj.weekDaysList.length === 7) {
            scope.weekNames = scope.inputObj.weekDaysList;
          } else {
            scope.weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
          }

          // Setting whether to show Monday as the first day of the week or not.
          scope.mondayFirst = !!scope.inputObj.mondayFirst;

          if (scope.mondayFirst === true) {
            var lastWeekDay = scope.weekNames.shift();
            scope.weekNames.push(lastWeekDay);
          }
        }

        function initDates() {

          // МАССИВ С ДАТАМИ:
          // рабочая копия и копия на случай отмены!
          if (scope.inputObj.selectedDates && scope.inputObj.selectedDates.length > 0) {
            scope.selectedDates = angular.copy(scope.inputObj.selectedDates);
            scope.inputDates = angular.copy(scope.inputObj.selectedDates);
          } else {
            scope.selectedDates = [];
            scope.inputDates = [];
          }
          // методы:
          scope.selectedDates.findDate = function (year, month, date) {
            if (scope.selectedDates.length > 0) {
              for (var i = 0; i < scope.selectedDates.length; i++) {
                var d = scope.selectedDates[i];
                if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === date) {
                  return {isPresent: true, i: i};
                }
              }
            }
            return {isPresent: false};
          };

          scope.selectedDates.addRemove = function (year, month, date) {
            var find = this.findDate(year, month, date);
            if (find.isPresent) {
              scope.selectedDates.splice(find.i, 1);
            } else {
              scope.selectedDates.push(new Date(year, month, date));
            }
          };

          scope.selectedDates.sortByDate = function (direction) {
            direction = (direction && direction === 'desc') ? -1 : 1;
            if (this.length > 0) {
              for (var i = 0; i < this.length; i++) {
                this[i].sortField = this[i].getFullYear() * 10000 + this[i].getMonth() * 100 + this[i].getDate();
              }
            }

            this.sort(function (a, b) {
              return (a.sortField - b.sortField) * direction;
            });
          };

          scope.selectedDates.getNearestFutureMonth = function () {
            var today = new Date();
            var curYear = today.getFullYear();
            var curMonth = today.getMonth();

            this.sortByDate();

            if (this.length > 0) {
              for (var i = 0; i < this.length; i++) {
                var d = this[i];
                var dYear = d.getFullYear(), dMonth = d.getMonth();
                if ((dYear == curYear && dMonth >= curMonth) || dYear > curYear) {
                  return {year: dYear, month: dMonth}
                }
              }
              return {year: curYear, month: curMonth};
            } else {
              return {year: curYear, month: curMonth};
            }
          };
        }

        function initCalendarDates() {


          // МАССИВ ДАТ КАЛЕНДАРИКА:
          scope.dayList = [];
          // методы:
          scope.dayList.zero = function () {
            this.length = 0;
          };

          scope.dayList.findDay = function (year, month, date) {
            for (var i = 0; i < this.length; i++) {
              if (this[i].year === year && this[i].month === month && this[i].date === date) {
                return i;
              }
            }
          };

          scope.dayList.repaintDay = function (year, month, date) {
            var i = this.findDay(year, month, date);
            this[i].style.isSelected = !this[i].style.isSelected;
          };
        }

        function initBtns() {
          // BUTTONS:
          scope.btns = [];

          scope.btns.push({
            text: scope.closeLabel,
            type: scope.closeButtonType,
            onTap: function (e) {
              btnCancel();
              if (!scope.isNativeButtons) {
                scope.popup.close();
              }
            }
          });

          scope.btns.push({
            text: scope.okLabel,
            type: scope.okButtonType,
            onTap: function () {
              btnOk();
              if (!scope.isNativeButtons) {
                scope.popup.close();
              }
            }
          });
        }

        function initModal() {
          //Called when the user clicks on the 'Close' button of the modal
          scope.closeIonicDatePickerModal = function () {
            btnCancel();
            scope.closeModal();
          };
          //Called when the user clicks on the 'Clear' button of the modal
          scope.clearIonicDatePickerModal = function () {
            dateCleared();
            scope.closeModal();
          };
          //Called when the user clicks on the 'Today' button of the modal
          scope.setIonicDatePickerTodayDate = function () {
            //scope.inputObj.callback(undefined);
            scope.closeModal();
          };
          //Called when the user clicks on the Set' button of the modal
          scope.setIonicDatePickerDate = function () {
            btnOk();
            scope.closeModal();
          };

          if (scope.templateType === 'modal') {
            //Getting the reference for the 'ionic-datepicker' modal.
            $ionicModal.fromTemplateUrl('ionic-datepicker-modal.html', {
              scope: scope,
              animation: 'slide-in-up'
            }).then(function (modal) {
              scope.modal = modal;
            });
            scope.openModal = function () {
              scope.modal.show();
            };

            scope.closeModal = function () {
              scope.modal.hide();
            };
          }
        }

        function setViewMonth() {
          // выбор отображаемого месяца (текущий или ближайшие впереди)
          if (scope.inputObj.viewMonth && scope.inputObj.viewMonth.length > 0) {
            scope.viewYear = scope.inputObj.viewMonth[0].getFullYear();
            scope.viewMonth = scope.inputObj.viewMonth[0].getMonth();
          } else if (scope.selectedDates && scope.selectedDates.length > 0) {
            var date = scope.selectedDates.getNearestFutureMonth();
            scope.viewYear = date.year;
            scope.viewMonth = date.month;
          } else {
            scope.viewYear = new Date().getFullYear();
            scope.viewMonth = new Date().getMonth();
          }
        }

        function refreshDateList() {

          var today = new Date();
          var viewYear = scope.viewYear;
          var viewMonth = scope.viewMonth;
          var nowDay = today.getDate();
          var isCurMonthNow = (viewYear === today.getFullYear() && viewMonth === today.getMonth());

          var lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();

          scope.dayList.zero();

          for (var i = 1; i <= lastDay; i++) {
            var isSelected;
            var isToday = false;
            var isViewMonth = true;

            var iDate = new Date(viewYear, viewMonth, i);
            if (isCurMonthNow && nowDay === i) {
              isToday = true;
            }
            isSelected = scope.selectedDates.findDate(viewYear, viewMonth, i).isPresent;
            scope.dayList.push({
              year: viewYear,
              month: viewMonth,
              date: i,
              day: iDate.getDay(),
              style: {isSelected: isSelected, isToday: isToday, isViewMonth: isViewMonth}
            });
          }

          // set Monday as the first day of the week.
          var insertDays = scope.dayList[0].day - scope.mondayFirst;
          insertDays = (insertDays < 0) ? 6 : insertDays;
          lastDay = new Date(viewYear, viewMonth, 0).getDate();

          // конец предыдущего месяца
          var date = monthShift(viewYear, viewMonth, '-');
          isViewMonth = false;
          isToday = false;


          for (var j = 0; j < insertDays; j++) {

            iDate = new Date(date.year, date.month, lastDay - j);
            isSelected = scope.selectedDates.findDate(date.year, date.month, lastDay - j).isPresent;
            scope.dayList.unshift({
              year: date.year,
              month: date.month,
              date: lastDay - j,
              day: iDate.getDay(),
              style: {isSelected: isSelected, isToday: isToday, isViewMonth: isViewMonth}
            });
          }

          scope.rows = [0, 7, 14, 21, 28];
          if (scope.dayList.length / 7 > 5) {
            scope.rows.push(35); // = [0, 7, 14, 21, 28, 35];
          }

          var daysLeft = 7 - scope.dayList.length % 7;
          // начало следующего месяца
          date = monthShift(scope.viewYear, scope.viewMonth, '+');
          for (i = 1; i <= daysLeft; i++) {
            iDate = new Date(date.year, date.month, i);
            isSelected = scope.selectedDates.findDate(date.year, date.month, i).isPresent;

            scope.dayList.push({
              year: date.year,
              month: date.month,
              date: i,
              day: iDate.getDay(),
              style: {isSelected: isSelected, isToday: isToday, isViewMonth: isViewMonth}
            });
          }

          scope.cols = [0, 1, 2, 3, 4, 5, 6];

          //scope.numColumns = 7;
        }

        scope.prevMonth = function () {
          var date = monthShift(scope.viewYear, scope.viewMonth, '-');
          scope.viewYear = date.year;
          scope.viewMonth = date.month;

          refreshDateList();
        };

        scope.nextMonth = function () {
          var date = monthShift(scope.viewYear, scope.viewMonth, '+');
          scope.viewYear = date.year;
          scope.viewMonth = date.month;

          refreshDateList();
        };

        // tap по клеточке с датой
        scope.dateSelected = function (date) {
          scope.selectedDates.addRemove(date.year, date.month, date.date);
          scope.dayList.repaintDay(date.year, date.month, date.date);
        };

        function monthShift(year, month, direction) {
          switch (direction) {
            case '+':
              if (month === 11) {
                year++;
                month = 0;
              } else {
                month++;
              }
              break;

            case '-':
              if (month === 0) {
                year--;
                month = 11;
              } else {
                month--;
              }
              break;
          }

          return {year: year, month: month};
        }

        function btnOk() {
          scope.inputObj.callback(scope.selectedDates);
        }

        function btnCancel() {
          scope.inputObj.callback(scope.inputDates);
        }

        //Called when the user clicks on the button to invoke the 'ionic-datepicker'
        element.on("click", function () {
          //This code is added to set passed date from datepickerObject

          start();

          if (scope.templateType === 'modal') {
            scope.openModal();
          } else {
            //Getting the reference for the 'ionic-datepicker' popup.
            var buttons = scope.btns;
            if (!scope.isNativeButtons) {
              buttons = [];
            }
            scope.popup = $ionicPopup.show({
              templateUrl: 'ionic-datepicker-popup.html',
              //title: scope.titleLabel,
              //subTitle: '',
              cssClass: 'picker-body',
              scope: scope,
              buttons: buttons
            });
          }
        });
      }
    };
  }

})();