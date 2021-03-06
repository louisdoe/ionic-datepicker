(function(module) {
try {
  module = angular.module('ionic-multi-date-picker.templates');
} catch (e) {
  module = angular.module('ionic-multi-date-picker.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ionic-multi-date-picker-modal.html',
    '<ion-modal-view class=ionic-datepicker><hm-title-bar title="\'datepicker/dates\'" back=back()></hm-title-bar><ion-content class="has-header has-hm-button-footer overflow-scroll=" true"><div><ng-include src="\'template-body.html\'"></ng-include></div></ion-content><hm-button-footer title="\'btn_validate\'" click=btns ng-click=btnOkFunc();closeModal()></hm-button-footer></ion-modal-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('ionic-multi-date-picker.templates');
} catch (e) {
  module = angular.module('ionic-multi-date-picker.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ionic-multi-date-picker-plain.html',
    '<div ng-class=headerClass>{{ inputObj.header }}</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ionic-multi-date-picker.templates');
} catch (e) {
  module = angular.module('ionic-multi-date-picker.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ionic-multi-date-picker-popup.html',
    '<div class=ionic-datepicker><div class="title ng-hide" ng-show="header.length > 0"><h3 ng-class=headerClass ng-bind=header></h3></div><ng-include src="\'template-body.html\'"></ng-include><div class="btns-right-popup ng-hide" ng-show=!btnsIsNative><button class=button ng-repeat="btn in btns" ng-click=btn.onTap() ng-disabled="btn.sType == \'ok\' && errors.len > 0" ng-class=btn.type>{{ btn.text }}</button></div><div class=clear></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ionic-multi-date-picker.templates');
} catch (e) {
  module = angular.module('ionic-multi-date-picker.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template-body.html',
    '<h4>{{ \'datepicker/select\' | translate }}</h4><div class="navigator row no-padding"><div class="col col-20 left-arrow" ng-click=prevMonth()><a class="button button-icon icon ion-chevron-left button-hm-74"></a></div><div class="col col-60 view-month text-center">{{ monthsList[viewMonth] }} {{ viewYear }}</div><div class="col col-20" ng-click=nextMonth()><a class="button button-icon icon ion-chevron-right button-hm-74"></a></div></div><label class="month-year-selector item item-input"><input type=month ng-model=monthYear.select ng-change=monthYearSelect()></label> <button class="button ng-binding button-clear button-balanced custom-button-center" ng-click=callBtnToday() ng-class=btn.type>Aujourd\'hui</button><div class=calendar-grid><div class=row><div class="col week-days" ng-class="{\'weekend\': ($index == 5 || $index == 6)}" ng-repeat="weekName in weekNames track by $index" ng-bind=weekName></div></div><div class=date-grid><div class="row date-row" ng-repeat="row in rows track by $index"><div class="col no-padding date-col" ng-repeat="col in cols track by $index" ng-class="{\'selected\': (dayList[row + $index].style.isSelected && accessType == \'WRITE\') , \'selected-light\': (dayList[row + $index].style.isSelected && accessType == \'READ\') , \'today\' : (dayList[row + $index].style.isToday) , \'weekend\': ((dayList[row + $index].day == 6 || dayList[row + $index].day == 0) && viewMonth == dayList[row + $index].month) , \'disabledDate\': (dayList[row + $index].style.isDisabled) , \'not-empty\': !(dayList[row + $index].style.isToday || dayList[row + $index].style.isSelected || dayList[row + $index].style.isDisabled) && (dayList[row + $index].style.isCalendar0 || dayList[row + $index].style.isCalendar1 || dayList[row + $index].style.isCalendar2 || dayList[row + $index].style.isCalendar3 || dayList[row + $index].style.isCalendar4 || dayList[row + $index].style.isCalendar5 || dayList[row + $index].style.isCalendar6 || dayList[row + $index].style.isCalendar7) , \'not-cur-month\': (!dayList[row + $index].style.isViewMonth)}"><div class=date-cell on-hold="onHold(dayList[row + $index])" on-release="onRelease(dayList[row + $index])" on-tap="onTap(dayList[row + $index], row)">{{ dayList[row + col].date }}</div><div class="calendar-0 ng-hide" ng-class=calendar[0].class ng-show="dayList[row + $index].style.isCalendar0"></div><div class="calendar-1 ng-hide" ng-class=calendar[1].class ng-show="dayList[row + $index].style.isCalendar1"></div><div class="calendar-2 ng-hide" ng-class=calendar[2].class ng-show="dayList[row + $index].style.isCalendar2"></div><div class="calendar-3 ng-hide" ng-class=calendar[3].class ng-show="dayList[row + $index].style.isCalendar3"></div><div class="calendar-4 ng-hide" ng-class=calendar[4].class ng-show="dayList[row + $index].style.isCalendar4"></div><div class="calendar-5 ng-hide" ng-class=calendar[5].class ng-show="dayList[row + $index].style.isCalendar5"></div><div class="calendar-6 ng-hide" ng-class=calendar[6].class ng-show="dayList[row + $index].style.isCalendar6"></div><div class="calendar-7 ng-hide" ng-class=calendar[7].class ng-show="dayList[row + $index].style.isCalendar7"></div></div></div></div></div><div class="calendar-names ng-hide" ng-show="calendarNamesCount > 0"><div class=calendars-point ng-class="{\'calendars-point-today\': (holded.is && holded.isToday), \'calendars-point-selected\': (holded.is && holded.isSelected), \'calendars-point-disabled\': (holded.is && holded.isDisabled), \'calendars-point-contour\': (!(holded.isToday || holded.isSelected || holded.isDisabled))}">{{ holded.date }}</div><div class="calendar-0-point ng-hide" ng-show="calendar[0].name.title.length > 0 && (!holded.is || holded.isCalendar0)" ng-class=calendar[0].class>.</div><div class="calendar-1-point ng-hide" ng-show="calendar[1].name.title.length > 0 && (!holded.is || holded.isCalendar1)" ng-class=calendar[1].class>.</div><div class="calendar-2-point ng-hide" ng-show="calendar[2].name.title.length > 0 && (!holded.is || holded.isCalendar2)" ng-class=calendar[2].class>.</div><div class="calendar-3-point ng-hide" ng-show="calendar[3].name.title.length > 0 && (!holded.is || holded.isCalendar3)" ng-class=calendar[3].class>.</div><div class="calendar-4-point ng-hide" ng-show="calendar[4].name.title.length > 0 && (!holded.is || holded.isCalendar4)" ng-class=calendar[4].class>.</div><div class="calendar-5-point ng-hide" ng-show="calendar[5].name.title.length > 0 && (!holded.is || holded.isCalendar5)" ng-class=calendar[5].class>.</div><div class="calendar-6-point ng-hide" ng-show="calendar[6].name.title.length > 0 && (!holded.is || holded.isCalendar6)" ng-class=calendar[6].class>.</div><div class="calendar-7-point ng-hide" ng-show="calendar[7].name.title.length > 0 && (!holded.is || holded.isCalendar7)" ng-class=calendar[7].class>.</div><div class="calendar-0-name ng-hide" ng-show="calendar[0].name.title.length > 0 && (!holded.is || holded.isCalendar0)">{{ calendar[0].name.title }}</div><div class="calendar-1-name ng-hide" ng-show="calendar[1].name.title.length > 0 && (!holded.is || holded.isCalendar1)">{{ calendar[1].name.title }}</div><div class="calendar-2-name ng-hide" ng-show="calendar[2].name.title.length > 0 && (!holded.is || holded.isCalendar2)">{{ calendar[2].name.title }}</div><div class="calendar-3-name ng-hide" ng-show="calendar[3].name.title.length > 0 && (!holded.is || holded.isCalendar3)">{{ calendar[3].name.title }}</div><div class="calendar-4-name ng-hide" ng-show="calendar[4].name.title.length > 0 && (!holded.is || holded.isCalendar4)">{{ calendar[4].name.title }}</div><div class="calendar-5-name ng-hide" ng-show="calendar[5].name.title.length > 0 && (!holded.is || holded.isCalendar5)">{{ calendar[5].name.title }}</div><div class="calendar-6-name ng-hide" ng-show="calendar[6].name.title.length > 0 && (!holded.is || holded.isCalendar6)">{{ calendar[6].name.title }}</div><div class="calendar-7-name ng-hide" ng-show="calendar[7].name.title.length > 0 && (!holded.is || holded.isCalendar7)">{{ calendar[7].name.title }}</div></div><div class=errors><div ng-repeat="error in errors">{{ error[errorLanguage] }}</div></div><div class="tgl-indeterminate-period ng-hide" ng-show="tglIndeterminatePeriodShow && accessType == \'WRITE\' && selectType != \'SINGLE\'"><div class="item item-toggle" ng-class=titleIndeterminatePeriodClass>{{ tglIndeterminatePeriod }} <label class="toggle toggle-balanced" ng-class=tglIndeterminatePeriodClass><input type=checkbox ng-model=indeterminatePeriod.is ng-change=indeterminatePeriodChange($event)><div class=track><div class=handle></div></div></label></div></div><div class="tgl-period ng-hide" ng-show="tglSelectByWeekShow && accessType == \'WRITE\' && selectType != \'SINGLE\'"><div class="item item-toggle" ng-class=titleSelectByWeekClass>{{ tglSelectByWeek }} <label class=toggle ng-class=tglSelectByWeekClass><input type=checkbox ng-model=selectByWeek.is><div class=track><div class=handle></div></div></label></div></div>');
}]);
})();
