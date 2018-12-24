(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["policy-policy-module"],{

/***/ "./node_modules/angular2-tag-input/dist/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/angular2-tag-input/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(/*! ./lib/tag-input.module */ "./node_modules/angular2-tag-input/dist/lib/tag-input.module.js"));
__export(__webpack_require__(/*! ./lib/components/tag-input/tag-input.component */ "./node_modules/angular2-tag-input/dist/lib/components/tag-input/tag-input.component.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/angular2-tag-input/dist/lib/components/tag-input-autocomplete/tag-input-autocomplete.component.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/angular2-tag-input/dist/lib/components/tag-input-autocomplete/tag-input-autocomplete.component.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var Observable_1 = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
var tag_input_keys_1 = __webpack_require__(/*! ../../shared/tag-input-keys */ "./node_modules/angular2-tag-input/dist/lib/shared/tag-input-keys.js");
var TagInputAutocompleteComponent = (function () {
    function TagInputAutocompleteComponent(elementRef) {
        this.elementRef = elementRef;
        this.selectFirstItem = false;
        this.itemSelected = new core_1.EventEmitter();
        this.enterPressed = new core_1.EventEmitter();
        this.selectedItemIndex = null;
    }
    Object.defineProperty(TagInputAutocompleteComponent.prototype, "itemsCount", {
        get: function () {
            return this.items ? this.items.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    TagInputAutocompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.keySubscription = Observable_1.Observable.fromEvent(window, 'keydown')
            .filter(function (event) {
            return event.keyCode === tag_input_keys_1.KEYS.upArrow ||
                event.keyCode === tag_input_keys_1.KEYS.downArrow ||
                event.keyCode === tag_input_keys_1.KEYS.enter ||
                event.keyCode === tag_input_keys_1.KEYS.esc;
        })
            .do(function (event) {
            switch (event.keyCode) {
                case tag_input_keys_1.KEYS.downArrow:
                    _this.handleDownArrow();
                    break;
                case tag_input_keys_1.KEYS.upArrow:
                    _this.handleUpArrow();
                    break;
                case tag_input_keys_1.KEYS.enter:
                    _this.selectItem();
                    _this.enterPressed.emit();
                    break;
                case tag_input_keys_1.KEYS.esc:
                    break;
            }
            event.stopPropagation();
            event.preventDefault();
        })
            .subscribe();
    };
    TagInputAutocompleteComponent.prototype.ensureHighlightVisible = function () {
        var container = this.elementRef.nativeElement.querySelector('.sk-select-results__container');
        if (!container) {
            return;
        }
        var choices = container.querySelectorAll('.sk-select-results__item');
        if (choices.length < 1) {
            return;
        }
        if (this.selectedItemIndex < 0) {
            return;
        }
        var highlighted = choices[this.selectedItemIndex];
        if (!highlighted) {
            return;
        }
        var posY = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop;
        var height = container.offsetHeight;
        if (posY > height) {
            container.scrollTop += posY - height;
        }
        else if (posY < highlighted.clientHeight) {
            container.scrollTop -= highlighted.clientHeight - posY;
        }
    };
    TagInputAutocompleteComponent.prototype.goToTop = function () {
        this.selectedItemIndex = 0;
        this.ensureHighlightVisible();
    };
    TagInputAutocompleteComponent.prototype.goToBottom = function (itemsCount) {
        this.selectedItemIndex = itemsCount - 1;
        this.ensureHighlightVisible();
    };
    TagInputAutocompleteComponent.prototype.goToNext = function () {
        if (this.selectedItemIndex + 1 < this.itemsCount) {
            this.selectedItemIndex++;
        }
        else {
            this.goToTop();
        }
        this.ensureHighlightVisible();
    };
    TagInputAutocompleteComponent.prototype.goToPrevious = function () {
        if (this.selectedItemIndex - 1 >= 0) {
            this.selectedItemIndex--;
        }
        else {
            this.goToBottom(this.itemsCount);
        }
        this.ensureHighlightVisible();
    };
    TagInputAutocompleteComponent.prototype.handleUpArrow = function () {
        if (this.selectedItemIndex === null) {
            this.goToBottom(this.itemsCount);
            return false;
        }
        this.goToPrevious();
    };
    TagInputAutocompleteComponent.prototype.handleDownArrow = function () {
        // Initialize to zero if first time results are shown
        if (this.selectedItemIndex === null) {
            this.goToTop();
            return false;
        }
        this.goToNext();
    };
    TagInputAutocompleteComponent.prototype.selectItem = function (itemIndex) {
        var itemToEmit = itemIndex ? this.items[itemIndex] : this.items[this.selectedItemIndex];
        if (itemToEmit) {
            this.itemSelected.emit(itemToEmit);
        }
    };
    TagInputAutocompleteComponent.prototype.ngOnChanges = function (changes) {
        if (this.selectFirstItem && this.itemsCount > 0) {
            this.goToTop();
        }
    };
    TagInputAutocompleteComponent.prototype.ngOnDestroy = function () {
        this.keySubscription.unsubscribe();
    };
    TagInputAutocompleteComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'rl-tag-input-autocomplete',
                    template: "\n    <div\n      *ngFor=\"let item of items; let itemIndex = index\"\n      [ngClass]=\"{ 'is-selected': selectedItemIndex === itemIndex }\"\n      (click)=\"selectItem(itemIndex)\"\n      class=\"rl-autocomplete-item\">\n      {{item}}\n    </div>\n  ",
                    styles: ["\n    :host {\n      box-shadow: 0 1.5px 4px rgba(0, 0, 0, 0.24), 0 1.5px 6px rgba(0, 0, 0, 0.12);\n      display: block;\n      position: absolute;\n      top: 100%;\n      font-family: \"Roboto\", \"Helvetica Neue\", sans-serif;\n      font-size: 16px;\n      color: #444444;\n      background: white;\n      padding: 8px 0;\n    }\n\n     :host .rl-autocomplete-item {\n      padding: 0 16px;\n      height: 48px;\n      line-height: 48px;\n    }\n\n     :host .is-selected {\n      background: #eeeeee;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    TagInputAutocompleteComponent.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    TagInputAutocompleteComponent.propDecorators = {
        'items': [{ type: core_1.Input },],
        'selectFirstItem': [{ type: core_1.Input },],
        'itemSelected': [{ type: core_1.Output },],
        'enterPressed': [{ type: core_1.Output },],
    };
    return TagInputAutocompleteComponent;
}());
exports.TagInputAutocompleteComponent = TagInputAutocompleteComponent;
//# sourceMappingURL=tag-input-autocomplete.component.js.map

/***/ }),

/***/ "./node_modules/angular2-tag-input/dist/lib/components/tag-input-item/tag-input-item.component.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/angular2-tag-input/dist/lib/components/tag-input-item/tag-input-item.component.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var TagInputItemComponent = (function () {
    function TagInputItemComponent() {
        this.tagRemoved = new core_1.EventEmitter();
    }
    Object.defineProperty(TagInputItemComponent.prototype, "isSelected", {
        get: function () { return !!this.selected; },
        enumerable: true,
        configurable: true
    });
    TagInputItemComponent.prototype.removeTag = function () {
        this.tagRemoved.emit(this.index);
    };
    TagInputItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'rl-tag-input-item',
                    template: "\n    {{text}}\n    <span\n    class=\"ng2-tag-input-remove\"\n    (click)=\"removeTag()\">&times;</span>\n  ",
                    styles: ["\n    :host {\n      font-family: \"Roboto\", \"Helvetica Neue\", sans-serif;\n      font-size: 16px;\n      height: 32px;\n      line-height: 32px;\n      display: inline-block;\n      background: #e0e0e0;\n      padding: 0 12px;\n      border-radius: 90px;\n      margin-right: 10px;\n      transition: all 0.12s ease-out;\n    }\n\n     :host .ng2-tag-input-remove {\n      background: #a6a6a6;\n      border-radius: 50%;\n      color: #e0e0e0;\n      cursor: pointer;\n      display: inline-block;\n      font-size: 17px;\n      height: 24px;\n      line-height: 24px;\n      margin-left: 6px;\n      margin-right: -6px;\n      text-align: center;\n      width: 24px;\n    }\n\n    :host.ng2-tag-input-item-selected {\n      color: white;\n      background: #0d8bff;\n    }\n\n     :host.ng2-tag-input-item-selected .ng2-tag-input-remove {\n      background: white;\n      color: #0d8bff;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    TagInputItemComponent.ctorParameters = [];
    TagInputItemComponent.propDecorators = {
        'selected': [{ type: core_1.Input },],
        'text': [{ type: core_1.Input },],
        'index': [{ type: core_1.Input },],
        'tagRemoved': [{ type: core_1.Output },],
        'isSelected': [{ type: core_1.HostBinding, args: ['class.ng2-tag-input-item-selected',] },],
    };
    return TagInputItemComponent;
}());
exports.TagInputItemComponent = TagInputItemComponent;
//# sourceMappingURL=tag-input-item.component.js.map

/***/ }),

/***/ "./node_modules/angular2-tag-input/dist/lib/components/tag-input/tag-input.component.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/angular2-tag-input/dist/lib/components/tag-input/tag-input.component.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var tag_input_keys_1 = __webpack_require__(/*! ../../shared/tag-input-keys */ "./node_modules/angular2-tag-input/dist/lib/shared/tag-input-keys.js");
/**
 * Taken from @angular/common/src/facade/lang
 */
function isBlank(obj) {
    return obj === undefined || obj === null;
}
var TagInputComponent = (function () {
    function TagInputComponent(fb, elementRef) {
        this.fb = fb;
        this.elementRef = elementRef;
        this.addOnBlur = true;
        this.addOnComma = true;
        this.addOnEnter = true;
        this.addOnPaste = true;
        this.addOnSpace = false;
        this.allowDuplicates = false;
        this.allowedTagsPattern = /.+/;
        this.autocomplete = false;
        this.autocompleteItems = [];
        this.autocompleteMustMatch = true;
        this.autocompleteSelectFirstItem = true;
        this.pasteSplitPattern = ',';
        this.placeholder = 'Add a tag';
        this.addTag = new core_1.EventEmitter();
        this.removeTag = new core_1.EventEmitter();
        this.canShowAutoComplete = false;
        this.autocompleteResults = [];
        this.tagsList = [];
        /** Implemented as part of ControlValueAccessor. */
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    Object.defineProperty(TagInputComponent.prototype, "tagInputField", {
        get: function () {
            return this.tagInputForm.get('tagInputField');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagInputComponent.prototype, "inputValue", {
        get: function () {
            return this.tagInputField.value;
        },
        enumerable: true,
        configurable: true
    });
    TagInputComponent.prototype.onDocumentClick = function (event, target) {
        if (!target) {
            return;
        }
        if (!this.elementRef.nativeElement.contains(target)) {
            this.canShowAutoComplete = false;
        }
    };
    TagInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.splitRegExp = new RegExp(this.pasteSplitPattern);
        this.tagInputForm = this.fb.group({
            tagInputField: ''
        });
        this.tagInputSubscription = this.tagInputField.valueChanges
            .do(function (value) {
            _this.autocompleteResults = _this.autocompleteItems.filter(function (item) {
                /**
                 * _isTagUnique makes sure to remove items from the autocompelte dropdown if they have
                 * already been added to the model, and allowDuplicates is false
                 */
                return item.toLowerCase().indexOf(value.toLowerCase()) > -1 && _this._isTagUnique(item);
            });
        })
            .subscribe();
    };
    TagInputComponent.prototype.onKeydown = function (event) {
        var key = event.keyCode;
        switch (key) {
            case tag_input_keys_1.KEYS.backspace:
                this._handleBackspace();
                break;
            case tag_input_keys_1.KEYS.enter:
                if (this.addOnEnter && !this.showAutocomplete()) {
                    this._addTags([this.inputValue]);
                    event.preventDefault();
                }
                break;
            case tag_input_keys_1.KEYS.comma:
                if (this.addOnComma) {
                    this._addTags([this.inputValue]);
                    event.preventDefault();
                }
                break;
            case tag_input_keys_1.KEYS.space:
                if (this.addOnSpace) {
                    this._addTags([this.inputValue]);
                    event.preventDefault();
                }
                break;
            default:
                break;
        }
    };
    TagInputComponent.prototype.onInputBlurred = function (event) {
        if (this.addOnBlur) {
            this._addTags([this.inputValue]);
        }
        this.isFocused = false;
    };
    TagInputComponent.prototype.onInputFocused = function () {
        var _this = this;
        this.isFocused = true;
        setTimeout(function () { return _this.canShowAutoComplete = true; });
    };
    TagInputComponent.prototype.onInputPaste = function (event) {
        var _this = this;
        var clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
        var pastedString = clipboardData.getData('text/plain');
        var tags = this._splitString(pastedString);
        this._addTags(tags);
        setTimeout(function () { return _this._resetInput(); });
    };
    TagInputComponent.prototype.onAutocompleteSelect = function (selectedItem) {
        this._addTags([selectedItem]);
        this.tagInputElement.nativeElement.focus();
    };
    TagInputComponent.prototype.onAutocompleteEnter = function () {
        if (this.addOnEnter && this.showAutocomplete() && !this.autocompleteMustMatch) {
            this._addTags([this.inputValue]);
        }
    };
    TagInputComponent.prototype.showAutocomplete = function () {
        return (this.autocomplete &&
            this.autocompleteItems &&
            this.autocompleteItems.length > 0 &&
            this.canShowAutoComplete &&
            this.inputValue.length > 0);
    };
    TagInputComponent.prototype._splitString = function (tagString) {
        tagString = tagString.trim();
        var tags = tagString.split(this.splitRegExp);
        return tags.filter(function (tag) { return !!tag; });
    };
    TagInputComponent.prototype._isTagValid = function (tagString) {
        return this.allowedTagsPattern.test(tagString) &&
            this._isTagUnique(tagString);
    };
    TagInputComponent.prototype._isTagUnique = function (tagString) {
        return this.allowDuplicates ? true : this.tagsList.indexOf(tagString) === -1;
    };
    TagInputComponent.prototype._isTagAutocompleteItem = function (tagString) {
        return this.autocompleteItems.indexOf(tagString) > -1;
    };
    TagInputComponent.prototype._emitTagAdded = function (addedTags) {
        var _this = this;
        addedTags.forEach(function (tag) { return _this.addTag.emit(tag); });
    };
    TagInputComponent.prototype._emitTagRemoved = function (removedTag) {
        this.removeTag.emit(removedTag);
    };
    TagInputComponent.prototype._addTags = function (tags) {
        var _this = this;
        var validTags = tags.map(function (tag) { return tag.trim(); })
            .filter(function (tag) { return _this._isTagValid(tag); })
            .filter(function (tag, index, tagArray) { return tagArray.indexOf(tag) === index; })
            .filter(function (tag) { return (_this.showAutocomplete() && _this.autocompleteMustMatch) ? _this._isTagAutocompleteItem(tag) : true; });
        this.tagsList = this.tagsList.concat(validTags);
        this._resetSelected();
        this._resetInput();
        this.onChange(this.tagsList);
        this._emitTagAdded(validTags);
    };
    TagInputComponent.prototype._removeTag = function (tagIndexToRemove) {
        var removedTag = this.tagsList[tagIndexToRemove];
        this.tagsList.splice(tagIndexToRemove, 1);
        this._resetSelected();
        this.onChange(this.tagsList);
        this._emitTagRemoved(removedTag);
    };
    TagInputComponent.prototype._handleBackspace = function () {
        if (!this.inputValue.length && this.tagsList.length) {
            if (!isBlank(this.selectedTag)) {
                this._removeTag(this.selectedTag);
            }
            else {
                this.selectedTag = this.tagsList.length - 1;
            }
        }
    };
    TagInputComponent.prototype._resetSelected = function () {
        this.selectedTag = null;
    };
    TagInputComponent.prototype._resetInput = function () {
        this.tagInputField.setValue('');
    };
    TagInputComponent.prototype.writeValue = function (value) {
        this.tagsList = value;
    };
    TagInputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    TagInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    TagInputComponent.prototype.ngOnDestroy = function () {
        this.tagInputSubscription.unsubscribe();
    };
    TagInputComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'rl-tag-input',
                    template: "\n    <rl-tag-input-item\n      [text]=\"tag\"\n      [index]=\"index\"\n      [selected]=\"selectedTag === index\"\n      (tagRemoved)=\"_removeTag($event)\"\n      *ngFor=\"let tag of tagsList; let index = index\">\n    </rl-tag-input-item>\n    <form [formGroup]=\"tagInputForm\" class=\"ng2-tag-input-form\">\n      <input\n        class=\"ng2-tag-input-field\"\n        type=\"text\"\n        #tagInputElement\n        formControlName=\"tagInputField\"\n        [placeholder]=\"placeholder\"\n        (paste)=\"onInputPaste($event)\"\n        (keydown)=\"onKeydown($event)\"\n        (blur)=\"onInputBlurred($event)\"\n        (focus)=\"onInputFocused()\">\n\n      <div *ngIf=\"showAutocomplete()\" class=\"rl-tag-input-autocomplete-container\">\n        <rl-tag-input-autocomplete\n          [items]=\"autocompleteResults\"\n          [selectFirstItem]=\"autocompleteSelectFirstItem\"\n          (itemSelected)=\"onAutocompleteSelect($event)\"\n          (enterPressed)=\"onAutocompleteEnter($event)\">\n        </rl-tag-input-autocomplete>\n      </div>\n    </form>\n  ",
                    styles: ["\n    :host {\n      font-family: \"Roboto\", \"Helvetica Neue\", sans-serif;\n      font-size: 16px;\n      display: block;\n      box-shadow: 0 1px #ccc;\n      padding: 8px 0 6px 0;\n      will-change: box-shadow;\n      transition: box-shadow 0.12s ease-out;\n    }\n\n     :host .ng2-tag-input-form {\n      display: inline;\n    }\n\n     :host .ng2-tag-input-field {\n      font-family: \"Roboto\", \"Helvetica Neue\", sans-serif;\n      font-size: 16px;\n      display: inline-block;\n      width: auto;\n      box-shadow: none;\n      border: 0;\n      padding: 8px 0;\n    }\n\n     :host .ng2-tag-input-field:focus {\n      outline: 0;\n    }\n\n     :host .rl-tag-input-autocomplete-container {\n      position: relative;\n      z-index: 10;\n    }\n\n    :host.ng2-tag-input-focus {\n      box-shadow: 0 2px #0d8bff;\n    }\n  "],
                    providers: [
                        { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return TagInputComponent; }), multi: true },
                    ]
                },] },
    ];
    /** @nocollapse */
    TagInputComponent.ctorParameters = [
        { type: forms_1.FormBuilder, },
        { type: core_1.ElementRef, },
    ];
    TagInputComponent.propDecorators = {
        'isFocused': [{ type: core_1.HostBinding, args: ['class.ng2-tag-input-focus',] },],
        'addOnBlur': [{ type: core_1.Input },],
        'addOnComma': [{ type: core_1.Input },],
        'addOnEnter': [{ type: core_1.Input },],
        'addOnPaste': [{ type: core_1.Input },],
        'addOnSpace': [{ type: core_1.Input },],
        'allowDuplicates': [{ type: core_1.Input },],
        'allowedTagsPattern': [{ type: core_1.Input },],
        'autocomplete': [{ type: core_1.Input },],
        'autocompleteItems': [{ type: core_1.Input },],
        'autocompleteMustMatch': [{ type: core_1.Input },],
        'autocompleteSelectFirstItem': [{ type: core_1.Input },],
        'pasteSplitPattern': [{ type: core_1.Input },],
        'placeholder': [{ type: core_1.Input },],
        'addTag': [{ type: core_1.Output, args: ['addTag',] },],
        'removeTag': [{ type: core_1.Output, args: ['removeTag',] },],
        'tagInputElement': [{ type: core_1.ViewChild, args: ['tagInputElement',] },],
        'onDocumentClick': [{ type: core_1.HostListener, args: ['document:click', ['$event', '$event.target'],] },],
    };
    return TagInputComponent;
}());
exports.TagInputComponent = TagInputComponent;
//# sourceMappingURL=tag-input.component.js.map

/***/ }),

/***/ "./node_modules/angular2-tag-input/dist/lib/shared/tag-input-keys.js":
/*!***************************************************************************!*\
  !*** ./node_modules/angular2-tag-input/dist/lib/shared/tag-input-keys.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.KEYS = {
    backspace: 8,
    comma: 188,
    downArrow: 40,
    enter: 13,
    esc: 27,
    space: 32,
    upArrow: 38
};
//# sourceMappingURL=tag-input-keys.js.map

/***/ }),

/***/ "./node_modules/angular2-tag-input/dist/lib/tag-input.module.js":
/*!**********************************************************************!*\
  !*** ./node_modules/angular2-tag-input/dist/lib/tag-input.module.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
__webpack_require__(/*! rxjs/add/observable/fromEvent */ "./node_modules/rxjs-compat/_esm5/add/observable/fromEvent.js");
__webpack_require__(/*! rxjs/add/operator/filter */ "./node_modules/rxjs-compat/_esm5/add/operator/filter.js");
__webpack_require__(/*! rxjs/add/operator/do */ "./node_modules/rxjs-compat/_esm5/add/operator/do.js");
var tag_input_autocomplete_component_1 = __webpack_require__(/*! ./components/tag-input-autocomplete/tag-input-autocomplete.component */ "./node_modules/angular2-tag-input/dist/lib/components/tag-input-autocomplete/tag-input-autocomplete.component.js");
var tag_input_component_1 = __webpack_require__(/*! ./components/tag-input/tag-input.component */ "./node_modules/angular2-tag-input/dist/lib/components/tag-input/tag-input.component.js");
var tag_input_item_component_1 = __webpack_require__(/*! ./components/tag-input-item/tag-input-item.component */ "./node_modules/angular2-tag-input/dist/lib/components/tag-input-item/tag-input-item.component.js");
var RlTagInputModule = (function () {
    function RlTagInputModule() {
    }
    RlTagInputModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        forms_1.ReactiveFormsModule
                    ],
                    declarations: [
                        tag_input_autocomplete_component_1.TagInputAutocompleteComponent,
                        tag_input_component_1.TagInputComponent,
                        tag_input_item_component_1.TagInputItemComponent
                    ],
                    exports: [
                        tag_input_component_1.TagInputComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    RlTagInputModule.ctorParameters = [];
    return RlTagInputModule;
}());
exports.RlTagInputModule = RlTagInputModule;
//# sourceMappingURL=tag-input.module.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/add/operator/do.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/add/operator/do.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _operator_do__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../operator/do */ "./node_modules/rxjs-compat/_esm5/operator/do.js");


rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype.do = _operator_do__WEBPACK_IMPORTED_MODULE_1__["_do"];
rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype._do = _operator_do__WEBPACK_IMPORTED_MODULE_1__["_do"];
//# sourceMappingURL=do.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/add/operator/filter.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/add/operator/filter.js ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _operator_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../operator/filter */ "./node_modules/rxjs-compat/_esm5/operator/filter.js");


rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype.filter = _operator_filter__WEBPACK_IMPORTED_MODULE_1__["filter"];
//# sourceMappingURL=filter.js.map

/***/ }),

/***/ "./src/app/pages/policy/antidetection/antidetection.component.css":
/*!************************************************************************!*\
  !*** ./src/app/pages/policy/antidetection/antidetection.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/policy/antidetection/antidetection.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/pages/policy/antidetection/antidetection.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"content\">\n  <div class=\"row\">\n    <!-- NEW WIDGET START -->\n    <article class=\"col-sm-12 col-md-12 col-lg-12\">\n      <!-- Widget ID (each widget will need unique ID)-->\n      <div>\n        <!-- widget div-->\n        <!-- widget content -->\n        <div class=\"widget-body\" style=\"padding: 0 0 0 0px; background: #fff; border-radius: 0.25rem;\">\n          <ul id=\"myTab1\" class=\"nav nav-tabs bordered\">\n            <li [class.active]=false>\n              <a routerLink=\"/pages/policy/secrules/{{_id}}\">攻击防护</a>\n            </li>\n            <li [class.active]=false>\n              <a routerLink=\"/pages/policy/antilink/{{_id}}\">防信息滥用</a>\n            </li>\n            <li [class.active]=false>\n              <a routerLink=\"/pages/policy/limitconn/{{_id}}\">防CC</a>\n            </li>\n            <li [class.active]=true>\n              <a routerLink=\"/pages/policy/antidetection/{{_id}}\">防探测</a>\n            </li>\n          </ul>\n          <div class=\"padding-top-10 col-md-12\" style=\"background: #fff;\">\n            <form class=\"form-horizontal\"\n                  #antidetectionForm=\"ngForm\">\n              <div class=\"col-md-12\">\n                <div class=\"form-group col-md-12\" style=\"padding-top: 20px;\">\n                  <legend>恶意爬虫检测</legend>\n                </div>\n\n                <div class=\"form-group\">\n                  <div class=\"col-md-4 control-label\">\n                    状态\n                  </div>\n                  <div class=\"col-md-8\">\n                    <label class=\"radio radio-inline\">\n                      <input type=\"radio\" name=\"crawler_states\" id=\"crawler_states_1\"\n                             (click)=\"setStateCrawlerState(true)\"\n                             [checked]=\"datas.config.twaf_anti_mal_crawler.state\"\n                             value=\"1\">\n                      开 </label>\n                    <label class=\"radio radio-inline\">\n                      <input type=\"radio\" name=\"crawler_states\" id=\"crawler_states_0\"\n                             (click)=\"setStateCrawlerState(false)\"\n                             [checked]=\"!datas.config.twaf_anti_mal_crawler.state\"\n                             value=\"0\">\n                      关 </label>\n                  </div>\n                </div>\n\n                <div class=\"form-group\">\n                  <div class=\"col-md-4 control-label\">爬虫诱捕</div>\n                    <div class=\"col-md-8\">\n                      <div class=\"checkbox\">\n                        <label>\n                          <input\n                                  id=\"force_scan_robots_state\"\n                                  name = \"force_scan_robots_state\"\n                                  [(ngModel)]=\"datas.config.twaf_anti_mal_crawler.force_scan_robots_state\"\n                                  [checked]=\"datas.config.twaf_anti_mal_crawler.force_scan_robots_state\"\n                                  type=\"checkbox\"\n                          /> 爬虫诱捕链接\n                        </label>\n                      </div>\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                  <label class=\"col-md-4 control-label\">动作</label>\n                  <div class=\"col-md-2\">\n                    <select name=\"crawler_action\" id=\"crawler_action\" class=\"form-control\"\n                            [(ngModel)]=\"datas.config.twaf_anti_mal_crawler.action\">>\n                      <option class=\"col-md-1\"\n                              *ngFor=\"let item of crawler_action_list\"\n                              [value]=\"item.value\"\n                      >{{item.name}}\n                      </option>\n                    </select>\n                  </div>\n                  <div class=\"rowGroup\" [hidden]=\"datas.config.twaf_anti_mal_crawler.action !== 'redirect'\">\n                    <div class=\"col-md-2\">\n                      <input\n                             name=\"crawler_redirect_url\"\n                             id=\"crawler_redirect_url\"\n                             [(ngModel)]=\"datas.config.twaf_anti_mal_crawler.redirect_url\"\n                             class=\"form-control\"\n                      />\n                    </div>\n                  </div>\n                  <div class=\"col-md-2\">\n                    <select *ngIf=\"datas.config.twaf_anti_mal_crawler.action == 'deny'\"\n                            name=\"crawler_action_meta\" id=\"crawler_action_meta\" class=\"form-control\"\n                            [(ngModel)]=\"datas.config.twaf_anti_mal_crawler.action_meta\">\n                      <option class=\"col-md-1\"\n                              *ngFor=\"let item of codeList\"\n                              [value]=\"item.value\"\n                      >{{item.text}}\n                      </option>\n                    </select>\n                  </div>\n                </div>\n\n                <div class=\"form-actions tt-form-actions-center\" style=\"padding-bottom: 25px; padding-top: 15px;\">\n                  <footer>\n                    <button type=\"submit\" class=\"btn tt-btn-info btn-sm\" (click)=\"submit(antidetectionForm)\">\n                      确 认\n                    </button>&nbsp;&nbsp;\n                    <!-- <button type=\"button\" class=\"btn btn-primary\" (click)=\"Reset()\">\n                       重置\n                     </button>-->\n                    <button type=\"button\" class=\"btn tt-btn-info btn-sm\" [routerLink]=\"['/pages/policy']\">\n                      取 消\n                    </button>\n                  </footer>\n                </div>\n              </div>\n            </form>\n\n          </div>\n          <!-- end widget content -->\n        </div>\n        <!-- end widget div -->\n      </div>\n      <!-- end widget -->\n    </article>\n    <!-- WIDGET END -->\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/pages/policy/antidetection/antidetection.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/policy/antidetection/antidetection.component.ts ***!
  \***********************************************************************/
/*! exports provided: AntidetectionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AntidetectionComponent", function() { return AntidetectionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _policy_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../policy.class */ "./src/app/pages/policy/policy.class.ts");
/* harmony import */ var _policy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../policy.service */ "./src/app/pages/policy/policy.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AntidetectionComponent = /** @class */ (function () {
    function AntidetectionComponent(_router, _service, _activatedRoute) {
        this._router = _router;
        this._service = _service;
        this._activatedRoute = _activatedRoute;
        this.datas = new _policy_class__WEBPACK_IMPORTED_MODULE_2__["PolicyClass"]();
        this.headers = [];
        this.robot_action_list = [
            { 'name': '拦截并发送响应码', 'value': 'deny' },
            { 'name': '重定向', 'value': 'redirect' },
            { 'name': '连接重置', 'value': 'reset_connection' },
            { 'name': '放行', 'value': 'pass' },
        ];
        this.detection_action_list = [
            { 'name': '拦截并发送响应码', 'value': 'deny' },
            { 'name': '重定向', 'value': 'redirect' },
            { 'name': '连接重置', 'value': 'reset_connection' },
            { 'name': '放行', 'value': 'pass' },
            { 'name': '人机识别', 'value': 'robot' },
        ];
        this.crawler_action_list = [
            { 'name': '拦截并发送响应码', 'value': 'deny' },
            { 'name': '重定向', 'value': 'redirect' },
            { 'name': '连接重置', 'value': 'reset_connection' },
            { 'name': '放行', 'value': 'pass' },
        ];
        this.mode_list = [
            { 'name': 'captcha', 'value': 'captcha' },
            { 'name': 'js', 'value': 'js' },
        ];
        this.codeList = [
            { value: "400", text: "400" },
            { value: "401", text: "401" },
            { value: "403", text: "403" },
            { value: "404", text: "404" },
            { value: "405", text: "405" },
            { value: "410", text: "410" },
            { value: "500", text: "500" },
            { value: "501", text: "501" },
            { value: "503", text: "503" },
            { value: "504", text: "504" }
        ];
    }
    AntidetectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 初始化表单数据
        this._activatedRoute.params.subscribe(function (params) {
            _this._id = params['_id'];
            if (_this._id) {
                _this._service.getPolicy(_this._id).subscribe(function (data) {
                    _this.datas.config = data['result'];
                });
            }
        });
    };
    AntidetectionComponent.prototype.setStateCrawlerState = function (value) {
        this.datas.config.twaf_anti_mal_crawler.state = value;
    };
    AntidetectionComponent.prototype.submit = function (form) {
        var that = this;
        this._service.setPolicy(this._id, this.datas).subscribe(function (res) {
            if (res['_status']) {
                // this.toastr.success('编辑成功！', '');
                // 延迟1s 后跳转至列表页面
                setTimeout(function () {
                    that._router.navigate(['pages', 'policy']); // 为什么用that ： this容易找不到指代的是谁
                }, '1000');
            }
            else {
                // this.toastr.error('编辑失败！', '');
            }
        }, function (error) {
            // this.toastr.error('编辑失败！', '');
        });
    };
    AntidetectionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-antidetection',
            template: __webpack_require__(/*! ./antidetection.component.html */ "./src/app/pages/policy/antidetection/antidetection.component.html"),
            styles: [__webpack_require__(/*! ./antidetection.component.css */ "./src/app/pages/policy/antidetection/antidetection.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _policy_service__WEBPACK_IMPORTED_MODULE_3__["PolicyService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], AntidetectionComponent);
    return AntidetectionComponent;
}());



/***/ }),

/***/ "./src/app/pages/policy/antilink/antilink.component.css":
/*!**************************************************************!*\
  !*** ./src/app/pages/policy/antilink/antilink.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/policy/antilink/antilink.component.html":
/*!***************************************************************!*\
  !*** ./src/app/pages/policy/antilink/antilink.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"content\">\n    <div class=\"row\">\n        <!-- NEW WIDGET START -->\n        <article class=\"col-sm-12 col-md-12 col-lg-12\">\n            <!-- Widget ID (each widget will need unique ID)-->\n            <div>\n                <!-- widget div-->\n                <!-- widget content -->\n                <div class=\"widget-body\" style=\"padding: 0 0 0 0px; background: #fff; border-radius: 0.25rem;\">\n                    <ul id=\"myTab1\" class=\"nav nav-tabs bordered\">\n                      <li [class.active]=false>\n                        <a routerLink=\"/pages/policy/secrules/{{_id}}\">攻击防护</a>\n                      </li>\n                      <li [class.active]=true>\n                        <a routerLink=\"/pages/policy/antilink/{{_id}}\">防信息滥用</a>\n                      </li>\n                      <li [class.active]=false>\n                        <a routerLink=\"/pages/policy/limitconn/{{_id}}\">防CC</a>\n                      </li>\n                      <li [class.active]=false>\n                        <a routerLink=\"/pages/policy/antidetection/{{_id}}\">防探测</a>\n                      </li>\n                    </ul>\n                    <div class=\"padding-top-10 col-md-12\" style=\"background: #fff;\">\n                        <form class=\"form-horizontal\"\n                              #antilinkForm=\"ngForm\">\n                            <div class=\"col-md-12\">\n\n                                <div class=\"form-group col-md-12\" style=\"padding-top: 20px;\">\n                                    <legend>防信息滥用</legend>\n                                </div>\n                                <div class=\"form-group\">\n                                    <div class=\"col-md-4 control-label\">\n                                        状态\n                                    </div>\n                                    <div class=\"col-md-8\">\n                                        <label class=\"radio radio-inline\">\n                                            <input type=\"radio\" name=\"state\" id=\"hotlink_state_1\"\n                                                   (click)=\"setState(true)\"\n                                                   [checked]=\"datas.config.twaf_anti_hotlink.state\" value=\"1\">\n                                            开 </label>\n                                        <label class=\"radio radio-inline\">\n                                            <input type=\"radio\" name=\"state\" id=\"hotlink_state_0\"\n                                                   (click)=\"setState(false)\"\n                                                   [checked]=\"!datas.config.twaf_anti_hotlink.state\" value=\"0\">\n                                            关 </label>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label class=\"control-label col-md-4\">文件扩展名</label>\n                                    <div class=\"col-md-4\">\n                                        <rl-tag-input name=\"uri_ext\" [(ngModel)]=\"datas.config.twaf_anti_hotlink.uri_ext\"></rl-tag-input>\n                                        <!--<input smartTags class=\"form-control tagsinput\" name=\"uri_ext\"\n                                               [ngModel]=\"uri_ext\"\n                                               value=\"{{uri_ext}}\" data-role=\"tagsinput\">-->\n                                    </div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label class=\"col-md-4 control-label\">工作模式</label>\n                                    <div class=\"col-md-2\">\n                                        <select name=\"mode\" id=\"mode\" class=\"form-control\"\n                                                [(ngModel)]=\"datas.config.twaf_anti_hotlink.mode\">\n                                            <option class=\"col-md-1\"\n                                                    *ngFor=\"let item of mode_list\"\n                                                    [value]=\"item.value\"\n                                            >{{item.name}}\n                                            </option>\n                                        </select>\n                                    </div>\n                                </div>\n\n                                <div class=\"form-group\" [hidden]=\"datas.config.twaf_anti_hotlink.mode !== 'referer'\">\n                                    <div class=\"rowGroup\">\n                                        <label class=\"col-md-4 control-label\" for=\"exclude\">排除</label>\n                                        <div class=\"col-md-4\">\n                                        <textarea id=\"exclude\"\n                                                  [(ngModel)]=\"exclude\"\n                                                  class=\"form-control\" rows=\"3\"\n                                                  name=\"exclude\"></textarea>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\" [hidden]=\"datas.config.twaf_anti_hotlink.mode !== 'cookie'\">\n                                    <div class=\"rowGroup\">\n                                        <label class=\"col-md-4 control-label\" for=\"entry\">入口</label>\n                                        <div class=\"col-md-4\">\n                                        <textarea id=\"entry\"\n                                                  [(ngModel)]=\"entry\"\n                                                  class=\"form-control\" rows=\"3\"\n                                                  name=\"entry\"></textarea>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <div class=\"rowGroup\">\n                                        <label class=\"col-md-4 control-label\">动作</label>\n                                        <div class=\"col-md-2\">\n                                            <select name=\"action\" id=\"ant_action\" class=\"form-control\"\n                                                    [(ngModel)]=\"datas.config.twaf_anti_hotlink.action\">\n                                                <option class=\"col-md-1\"\n                                                        *ngFor=\"let item of ant_action_list\"\n                                                        [value]=\"item.value\"\n                                                >{{item.name}}\n                                                </option>\n                                            </select>\n                                        </div>\n                                    </div>\n                                    <div class=\"rowGroup\" [hidden]=\"datas.config.twaf_anti_hotlink.action != 'redirect'\">\n                                        <div class=\"col-md-2\">\n                                            <input\n                                                   name=\"ant_redirect_url\"\n                                                   id=\"ant_redirect_url\"\n                                                   [(ngModel)]=\"datas.config.twaf_anti_hotlink.redirect_url\"\n                                                   class=\"form-control\"\n                                            />\n                                        </div>\n                                    </div>\n                                    <div class=\"col-md-2\">\n                                        <select *ngIf=\"datas.config.twaf_anti_hotlink.action == 'deny'\"\n                                                name=\"ant_action_meta\" id=\"ant_action_meta\" class=\"form-control\"\n                                                [(ngModel)]=\"datas.config.twaf_anti_hotlink.action_meta\">\n                                            <option class=\"col-md-1\"\n                                                    *ngFor=\"let item of codeList\"\n                                                    [value]=\"item.value\"\n                                            >{{item.text}}\n                                            </option>\n                                        </select>\n                                    </div>\n                                </div>\n\n                                <div class=\"form-actions tt-form-actions-center\" style=\"padding-bottom: 25px; padding-top: 15px;\">\n                                    <footer>\n                                        <button type=\"submit\" class=\"btn tt-btn-info btn-sm\" (click)=\"submit(antilinkForm)\">\n                                            确 认\n                                        </button>&nbsp;&nbsp;\n                                        <!-- <button type=\"button\" class=\"btn btn-primary\" (click)=\"Reset()\">\n                                           重置\n                                         </button>-->\n                                        <button type=\"button\" class=\"btn tt-btn-info btn-sm\" [routerLink]=\"['/pages/policy']\">\n                                            取 消\n                                        </button>\n                                    </footer>\n                                </div>\n                            </div>\n                        </form>\n\n                    </div>\n                    <!-- end widget content -->\n                </div>\n                <!-- end widget div -->\n            </div>\n            <!-- end widget -->\n        </article>\n        <!-- WIDGET END -->\n    </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/pages/policy/antilink/antilink.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/policy/antilink/antilink.component.ts ***!
  \*************************************************************/
/*! exports provided: AntilinkComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AntilinkComponent", function() { return AntilinkComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _policy_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../policy.class */ "./src/app/pages/policy/policy.class.ts");
/* harmony import */ var _policy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../policy.service */ "./src/app/pages/policy/policy.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AntilinkComponent = /** @class */ (function () {
    function AntilinkComponent(_router, _service, _activatedRoute) {
        this._router = _router;
        this._service = _service;
        this._activatedRoute = _activatedRoute;
        this.datas = new _policy_class__WEBPACK_IMPORTED_MODULE_2__["PolicyClass"]();
        this.i = new Date().getTime();
        this.headers = [];
        this.mode_list = [
            { 'name': 'Referer', 'value': 'referer' },
            { 'name': 'Cookie', 'value': 'cookie' },
        ];
        this.ant_action_list = [
            { 'name': '拦截并发送响应码', 'value': 'deny' },
            { 'name': '重定向', 'value': 'redirect' },
            { 'name': '连接重置', 'value': 'reset_connection' },
            { 'name': '放行', 'value': 'pass' },
        ];
        this.codeList = [
            { value: "400", text: "400" },
            { value: "401", text: "401" },
            { value: "403", text: "403" },
            { value: "404", text: "404" },
            { value: "405", text: "405" },
            { value: "410", text: "410" },
            { value: "500", text: "500" },
            { value: "501", text: "501" },
            { value: "503", text: "503" },
            { value: "504", text: "504" }
        ];
    }
    AntilinkComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 初始化表单数据
        this._activatedRoute.params.subscribe(function (params) {
            _this._id = params['_id'];
            if (_this._id) {
                _this._service.getPolicy(_this._id).subscribe(function (data) {
                    _this.datas.config = data['result'];
                    if (JSON.stringify(_this.datas.config.twaf_anti_hotlink.exclude) !== '{}') {
                        _this.exclude = _this.datas.config.twaf_anti_hotlink.exclude.join('\n');
                    }
                    if (JSON.stringify(_this.datas.config.twaf_anti_hotlink.entry) !== '{}') {
                        _this.entry = _this.datas.config.twaf_anti_hotlink.entry.join('\n');
                    }
                });
            }
        });
    };
    AntilinkComponent.prototype.setState = function (value) {
        this.datas.config.twaf_anti_hotlink.state = value;
    };
    AntilinkComponent.prototype.submit = function (form) {
        var that = this;
        if (this.exclude) {
            this.datas.config.twaf_anti_hotlink.exclude = this.exclude.split('\n');
        }
        else {
            this.datas.config.twaf_anti_hotlink.exclude = [];
        }
        if (this.entry) {
            this.datas.config.twaf_anti_hotlink.entry = this.entry.split('\n');
        }
        else {
            this.datas.config.twaf_anti_hotlink.entry = [];
        }
        this._service.setPolicy(this._id, this.datas).subscribe(function (res) {
            if (res['success']) {
                // this.toastr.success('编辑成功！', '');
                // 延迟1s 后跳转至列表页面
                setTimeout(function () {
                    that._router.navigate(['pages', 'policy']); // 为什么用that ： this容易找不到指代的是谁
                }, '1000');
            }
            else {
                // this.toastr.error('编辑失败！', '');
            }
        }, function (error) {
            // this.toastr.error('编辑失败！', '');
        });
    };
    AntilinkComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-antilink',
            template: __webpack_require__(/*! ./antilink.component.html */ "./src/app/pages/policy/antilink/antilink.component.html"),
            styles: [__webpack_require__(/*! ./antilink.component.css */ "./src/app/pages/policy/antilink/antilink.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _policy_service__WEBPACK_IMPORTED_MODULE_3__["PolicyService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], AntilinkComponent);
    return AntilinkComponent;
}());



/***/ }),

/***/ "./src/app/pages/policy/limitconn/limitconn.component.css":
/*!****************************************************************!*\
  !*** ./src/app/pages/policy/limitconn/limitconn.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/policy/limitconn/limitconn.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/pages/policy/limitconn/limitconn.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"content\">\n  <div class=\"row\">\n    <!-- NEW WIDGET START -->\n    <article class=\"col-sm-12 col-md-12 col-lg-12\">\n      <!-- Widget ID (each widget will need unique ID)-->\n      <div>\n        <!-- widget div-->\n        <!-- widget content -->\n        <div class=\"widget-body\" style=\"padding: 0 0 0 0px; background: #fff; border-radius: 0.25rem;\">\n          <ul id=\"myTab1\" class=\"nav nav-tabs bordered\">\n            <li [class.active]=false>\n              <a routerLink=\"/pages/policy/secrules/{{_id}}\">攻击防护</a>\n            </li>\n            <li [class.active]=false>\n              <a routerLink=\"/pages/policy/antilink/{{_id}}\">防信息滥用</a>\n            </li>\n            <li [class.active]=true>\n              <a routerLink=\"/pages/policy/limitconn/{{_id}}\">防CC</a>\n            </li>\n            <li [class.active]=false>\n              <a routerLink=\"/pages/policy/antidetection/{{_id}}\">防探测</a>\n            </li>\n          </ul>\n          <div class=\"padding-top-10 col-md-12\" style=\"background: #fff;\">\n            <form class=\"form-horizontal\"\n                  #limitconnForm=\"ngForm\">\n              <div class=\"col-md-12\">\n                <div class=\"form-group col-md-12\" style=\"padding-top: 20px;\">\n                  <legend>防CC</legend>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"col-md-4 control-label\">\n                    状态\n                  </div>\n                  <div class=\"col-md-8\">\n                    <label class=\"radio radio-inline\">\n                      <input type=\"radio\" name=\"limit_conn_state\" id=\"limit_conn_state_1\"\n                             (click)=\"setStateLimitState(true)\"\n                             [checked]=\"datas.config.twaf_limit_conn.state\"\n                             value=\"1\">\n                      开 </label>\n                    <label class=\"radio radio-inline\">\n                      <input type=\"radio\" name=\"limit_conn_state\" id=\"limit_conn_state_0\"\n                             (click)=\"setStateLimitState(false)\"\n                             [checked]=\"!datas.config.twaf_limit_conn.state\"\n                             value=\"0\">\n                      关 </label>\n                  </div>\n                </div>\n\n                <div class=\"form-group\">\n                  <label class=\"col-md-4 control-label\">触发阈值</label>\n                  <label class=\"control-label col-md-5 text-align-left\"></label>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-md-4 control-label\"></label>\n                  <label class=\"control-label col-md-5\" style=\"text-align:left;\">(当满足以下任一条件时，进入CC攻击防护状态)</label>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"rowGroup\">\n                    <label class=\"col-md-5 control-label\">每秒请求数</label>\n                    <div class=\"col-md-2\">\n                      <input\n                              type=\"number\"\n                              name=\"req_count_max\"\n                              id=\"req_count_max\"\n                              [(ngModel)]=\"datas.config.twaf_limit_conn.trigger_thr.req_count_max\"\n                              class=\"form-control\"/>\n                    </div>\n                  </div>\n                  <div class=\"col-md-1\" style=\"padding-top: 5px;\">次</div>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"rowGroup\">\n                    <label class=\"col-md-5 control-label\">每秒请求流量</label>\n                    <div class=\"col-md-2\">\n                      <input\n                              type=\"number\"\n                              name=\"req_flow_max\"\n                              id=\"req_flow_max\"\n                              [(ngModel)]=\"datas.config.twaf_limit_conn.trigger_thr.req_flow_max\"\n                              class=\"form-control\"/>\n                    </div>\n                  </div>\n                  <div class=\"col-md-1\" style=\"padding-top: 5px;\">B</div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-md-4 control-label\">清洗阈值</label>\n                  <label class=\"col-md-5 control-label text-align-left\"></label>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-md-4 control-label\"></label>\n                  <label class=\"col-md-5 control-label\" style=\"text-align:left;\">(当满足以下任一条件时，执行清洗动作)</label>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"rowGroup\">\n                    <label class=\"col-md-5 control-label\">单一源IP每秒请求数</label>\n                    <div class=\"col-md-2\">\n                      <input\n                              type=\"number\"\n                              name=\"req_max\"\n                              id=\"req_max\"\n                              [(ngModel)]=\"datas.config.twaf_limit_conn.clean_thr.req_max\"\n                              class=\"form-control\"/>\n                    </div>\n                  </div>\n                  <div class=\"col-md-1\" style=\"padding-top: 5px;\">个</div>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"rowGroup\">\n                    <label class=\"col-md-5 control-label\">单一源IP每秒新建连接数</label>\n                    <div class=\"col-md-2\">\n                      <input\n                              type=\"number\"\n                              name=\"new_conn_max\"\n                              id=\"new_conn_max\"\n                              [(ngModel)]=\"datas.config.twaf_limit_conn.clean_thr.new_conn_max\"\n                              class=\"form-control\"/>\n                    </div>\n                  </div>\n                  <div class=\"col-md-1\" style=\"padding-top: 5px;\">个</div>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"rowGroup\">\n                    <label class=\"col-md-5 control-label\">单一源IP总连接数</label>\n                    <div class=\"col-md-2\">\n                      <input\n                              type=\"number\"\n                              name=\"conn_max\"\n                              id=\"conn_max\"\n                              [(ngModel)]=\"datas.config.twaf_limit_conn.clean_thr.conn_max\"\n                              class=\"form-control\"/>\n                    </div>\n                  </div>\n                  <div class=\"col-md-1\" style=\"padding-top: 5px;\">个</div>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"rowGroup\">\n                    <label class=\"col-md-5 control-label\">单一路径每秒请求总数</label>\n                    <div class=\"col-md-2\">\n                      <input\n                              type=\"number\"\n                              name=\"uri_frequency_max\"\n                              id=\"uri_frequency_max\"\n                              [(ngModel)]=\"datas.config.twaf_limit_conn.clean_thr.uri_frequency_max\"\n                              class=\"form-control\"/>\n                    </div>\n                  </div>\n                  <div class=\"col-md-1\" style=\"padding-top: 5px;\">个</div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-md-4 control-label\">动作</label>\n                  <div class=\"col-md-2\">\n                    <select name=\"limit_conn_action\" id=\"limit_conn_action\" class=\"form-control\"\n                            [(ngModel)]=\"datas.config.twaf_limit_conn.action\">\n                      <option class=\"col-md-1\"\n                              *ngFor=\"let item of limit_conn_action_list\"\n                              [value]=\"item.value\"\n                      >{{item.name}}\n                      </option>\n                    </select>\n                  </div>\n                  <div class=\"rowGroup\" [hidden]=\"datas.config.twaf_limit_conn.action != 'redirect'\">\n                    <div class=\"col-md-2\">\n                      <input\n                             name=\"limit_conn_redirect_url\"\n                             id=\"limit_conn_redirect_url\"\n                             [(ngModel)]=\"datas.config.twaf_limit_conn.redirect_url\"\n                             class=\"form-control\"\n                      />\n                    </div>\n                  </div>\n                  <div class=\"col-md-2\">\n                    <select *ngIf=\"datas.config.twaf_limit_conn.action == 'deny'\"\n                            name=\"limit_conn_action_meta\" id=\"limit_conn_action_meta\" class=\"form-control\"\n                            [(ngModel)]=\"datas.config.twaf_limit_conn.action_meta\">\n                      <option class=\"col-md-1\"\n                              *ngFor=\"let item of codeList\"\n                              [value]=\"item.value\"\n                      >{{item.text}}\n                      </option>\n                    </select>\n                  </div>\n                </div>\n\n                <div class=\"form-actions tt-form-actions-center\" style=\"padding-bottom: 25px; padding-top: 15px;\">\n                  <footer>\n                    <button type=\"submit\" class=\"btn tt-btn-info btn-sm\" (click)=\"submit(limitconnForm)\">\n                      确 认\n                    </button>&nbsp;&nbsp;\n                    <!-- <button type=\"button\" class=\"btn btn-primary\" (click)=\"Reset()\">\n                       重置\n                     </button>-->\n                    <button type=\"button\" class=\"btn tt-btn-info btn-sm\" [routerLink]=\"['/pages/policy']\">\n                      取 消\n                    </button>\n                  </footer>\n                </div>\n              </div>\n            </form>\n\n          </div>\n          <!-- end widget content -->\n        </div>\n        <!-- end widget div -->\n      </div>\n      <!-- end widget -->\n    </article>\n    <!-- WIDGET END -->\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/pages/policy/limitconn/limitconn.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/policy/limitconn/limitconn.component.ts ***!
  \***************************************************************/
/*! exports provided: LimitconnComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LimitconnComponent", function() { return LimitconnComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _policy_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../policy.class */ "./src/app/pages/policy/policy.class.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _policy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../policy.service */ "./src/app/pages/policy/policy.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LimitconnComponent = /** @class */ (function () {
    function LimitconnComponent(_router, _service, _activatedRoute) {
        this._router = _router;
        this._service = _service;
        this._activatedRoute = _activatedRoute;
        this.datas = new _policy_class__WEBPACK_IMPORTED_MODULE_1__["PolicyClass"]();
        this.limit_conn_action_list = [
            { 'name': '拦截并发送响应码', 'value': 'deny' },
            { 'name': '重定向', 'value': 'redirect' },
            { 'name': '连接重置', 'value': 'reset_connection' },
            { 'name': '放行', 'value': 'pass' },
            { 'name': '人机识别', 'value': 'robot' },
        ];
        this.codeList = [
            { value: "400", text: "400" },
            { value: "401", text: "401" },
            { value: "403", text: "403" },
            { value: "404", text: "404" },
            { value: "405", text: "405" },
            { value: "410", text: "410" },
            { value: "500", text: "500" },
            { value: "501", text: "501" },
            { value: "503", text: "503" },
            { value: "504", text: "504" }
        ];
    }
    LimitconnComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 初始化表单数据
        this._activatedRoute.params.subscribe(function (params) {
            _this._id = params['_id'];
            if (_this._id) {
                _this._service.getPolicy(_this._id).subscribe(function (data) {
                    _this.datas.config = data['result'];
                });
            }
        });
    };
    LimitconnComponent.prototype.setStateLimitState = function (value) {
        this.datas.config.twaf_limit_conn.state = value;
    };
    LimitconnComponent.prototype.submit = function (form) {
        var that = this;
        this._service.setPolicy(this._id, this.datas).subscribe(function (res) {
            if (res['success']) {
                // this.toastr.success('编辑成功！', '');
                // 延迟1s 后跳转至列表页面
                setTimeout(function () {
                    that._router.navigate(['pages', 'policy']); // 为什么用that ： this容易找不到指代的是谁
                }, '1000');
            }
            else {
                // this.toastr.error('编辑失败！', '');
            }
        }, function (error) {
            // this.toastr.error('编辑失败！', '');
        });
    };
    LimitconnComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-limitconn',
            template: __webpack_require__(/*! ./limitconn.component.html */ "./src/app/pages/policy/limitconn/limitconn.component.html"),
            styles: [__webpack_require__(/*! ./limitconn.component.css */ "./src/app/pages/policy/limitconn/limitconn.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _policy_service__WEBPACK_IMPORTED_MODULE_3__["PolicyService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], LimitconnComponent);
    return LimitconnComponent;
}());



/***/ }),

/***/ "./src/app/pages/policy/policy-list/modal-content-policy.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/pages/policy/policy-list/modal-content-policy.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">{{title}}</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n        <i class=\"fa fa-times fa-lg\" aria-hidden=\"true\"></i>\n    </button>\n</div>\n<div class=\"modal-body\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <form\n                    class=\"form-horizontal\"\n                    id=\"line-form\"\n                    #policyForm=\"ngForm\"\n            >\n                <div style=\"background-color:#fff;\">\n                    <fieldset>\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-3 control-label\">名称</label>\n                                <div class=\"col-sm-7\">\n                                    <input type=\"text\"\n                                           class=\"form-control\"\n                                           name=\"name\"\n                                           id=\"name\"\n                                           [(ngModel)]=\"datas.result.name\"\n                                    />\n                                </div>\n                            </div>\n                            <div class=\"form-actions tt-form-actions-center\">\n                                <footer>\n                                    <button type=\"submit\" class=\"btn tt-btn-info btn-sm\" (click)=\"submit()\">\n                                        确认\n                                    </button>&nbsp;&nbsp;\n                                    <button type=\"button\" class=\"btn tt-btn-info btn-sm\" (click)=\"bsModalRef.hide()\">\n                                        返回\n                                    </button>\n                                </footer>\n                            </div>\n                        </div>\n                    </fieldset>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/policy/policy-list/modal-content-policy.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/pages/policy/policy-list/modal-content-policy.component.ts ***!
  \****************************************************************************/
/*! exports provided: ModalContentPolicyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalContentPolicyComponent", function() { return ModalContentPolicyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var _policy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../policy.service */ "./src/app/pages/policy/policy.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ModalContentPolicyComponent = /** @class */ (function () {
    function ModalContentPolicyComponent(bsModalRef, _service) {
        this.bsModalRef = bsModalRef;
        this._service = _service;
    }
    ModalContentPolicyComponent.prototype.ngOnInit = function () {
    };
    ModalContentPolicyComponent.prototype.submit = function (form) {
        var _this = this;
        this._service.addPolicy(this.datas['result']['name'], { config: this.datas['result']['config'] })
            .subscribe(function (data) {
            if (data['success']) {
                // this.toastr.success('防护策略添加成功！', '');
            }
            else {
                // this.toastr.error(data.message);
            }
            _this.bsModalRef.hide();
            _this.thats.setPage();
        }, function (error) {
            // this.toastr.error('防护策略添加失败!', JSON.stringify(error.error._issues));
        });
    };
    ModalContentPolicyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-modal-content-policy',
            template: __webpack_require__(/*! ./modal-content-policy.component.html */ "./src/app/pages/policy/policy-list/modal-content-policy.component.html"),
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalRef"],
            _policy_service__WEBPACK_IMPORTED_MODULE_2__["PolicyService"]])
    ], ModalContentPolicyComponent);
    return ModalContentPolicyComponent;
}());



/***/ }),

/***/ "./src/app/pages/policy/policy-list/policy-list.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/pages/policy/policy-list/policy-list.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nb-card>\n  <nb-card-header>\n    策略列表\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"offset-md-8 col-md-4\">\n          <div class=\"pull-right\" style=\"padding-top: 5px; padding-bottom: 5px; margin-bottom: 0px; float: right;\">\n            <a class=\"btn tt-btn-info btn-sm\" title=\"添加\" (click)=\"create()\" style=\"margin-right: 5px; color: #fff;\">\n              <i class=\"icon ion-plus-round\"></i> 添加\n            </a>\n            <a class=\"btn tt-btn-info btn-sm\" title=\"刷新\" (click)=\"refresh()\" style=\"color: #fff;\">\n              <i class=\"icon ion-loop\"></i> 刷新\n            </a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </nb-card-header>\n  <nb-card-body>\n    <ngx-datatable\n      class=\"table-striped table-hover\"\n      [rows]=\"rows\"\n      [loadingIndicator]=\"loadingIndicator\"\n      [columnMode]=\"'force'\"\n      [headerHeight]=\"40\"\n      [footerHeight]=\"45\"\n      [rowHeight]=\"'auto'\"\n      [messages]=\"{\n                emptyMessage: '无数据',\n                totalMessage: '条',\n                selectedMessage: '选中'\n            }\"\n\n      [cssClasses]=\"{\n        sortAscending: 'fa fa-caret-up',\n        sortDescending: 'fa fa-caret-down',\n        pagerLeftArrow: 'fa  fa-angle-left',\n        pagerRightArrow: 'fa fa-angle-right',\n        pagerPrevious: 'fa fa-angle-double-left',\n        pagerNext: 'fa fa-angle-double-right'\n      }\"\n      [reorderable]=\"reorderable\">\n      <ngx-datatable-column name=\"name\" [width]=\"100\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n          <strong>名称</strong>\n        </ng-template>\n        <ng-template let-row=\"row\" let-value=\"value\" ngx-datatable-cell-template>\n          <span>{{value}}</span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"result\" [width]=\"100\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n          <strong>仿真模式</strong>\n        </ng-template>\n        <ng-template let-row=\"row\" let-value=\"value\" ngx-datatable-cell-template>\n          <span>{{value.twaf_global.simulation}}</span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"result\" [width]=\"100\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n          <strong>智能行为检测</strong>\n        </ng-template>\n        <ng-template let-row=\"row\" let-value=\"value\" ngx-datatable-cell-template>\n          <span>{{value.twaf_secrules.intelligent_behavior_detection}}</span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column\n        name=\"result\"\n        [width]=\"300\"\n        [resizeable]=\"false\"\n        [sortable]=\"false\"\n        [draggable]=\"false\"\n        [canAutoResize]=\"false\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n          <strong>操作</strong>\n        </ng-template>\n        <ng-template class=\"row\" let-row=\"row\" let-value=\"value\" ngx-datatable-cell-template>\n          <!-- <a class=\"btn btn-info btn-xs\" title=\"复制\" (click)=\"copy(row)\" >\n               <i class=\"fa fa-pencil-square-o\"></i> 复制\n           </a>-->\n          <a class=\"btn tt-btn-success btn-xs\" title=\"编辑\" (click)=\"edit(row)\" style=\"color: #fff; margin-right: 5px;\">\n            <i class=\"icon ion-edit\"></i> 编辑\n          </a>\n          <a class=\"btn tt-btn-warning btn-xs\" title=\"删除\" (click)=\"delete(row)\" style=\"color: #fff;\">\n            <i class=\"icon ion-trash-a\"></i> 删除\n          </a>\n        </ng-template>\n      </ngx-datatable-column>\n    </ngx-datatable>\n  </nb-card-body>\n</nb-card>\n"

/***/ }),

/***/ "./src/app/pages/policy/policy-list/policy-list.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/policy/policy-list/policy-list.component.ts ***!
  \*******************************************************************/
/*! exports provided: PolicyListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PolicyListComponent", function() { return PolicyListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var _modal_content_policy_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal-content-policy.component */ "./src/app/pages/policy/policy-list/modal-content-policy.component.ts");
/* harmony import */ var _policy_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../policy.service */ "./src/app/pages/policy/policy.service.ts");
/* harmony import */ var _server_server_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../server/server.service */ "./src/app/pages/server/server.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PolicyListComponent = /** @class */ (function () {
    function PolicyListComponent(_service, _services, _router, modalService, bsModalRef) {
        this._service = _service;
        this._services = _services;
        this._router = _router;
        this.modalService = modalService;
        this.bsModalRef = bsModalRef;
        this.loadingIndicator = true;
        this.reorderable = true;
        this.rows = new Array();
    }
    PolicyListComponent.prototype.ngOnInit = function () {
        this.setPage();
    };
    PolicyListComponent.prototype.refresh = function () {
        this.setPage();
        // this.toastr.success('列表数据刷新完成!', '');
    };
    PolicyListComponent.prototype.edit = function (row) {
        this._router.navigate(['pages', 'policy', 'secrules', row.name]);
    };
    PolicyListComponent.prototype.delete = function (row) {
        console.log(row);
        var that = this;
        if (window.confirm('确定要删除该项么?')) {
            this._service.deletePolicy(row.name)
                .subscribe(function (data) {
                setTimeout(function () {
                    that.setPage();
                }, '1000');
                // that.toastr.success('删除成功！');
            }, function (error) {
                // that.toastr.error('删除失败！已被引用！');
            });
        }
    };
    PolicyListComponent.prototype.setPage = function () {
        var _this = this;
        this.rows = [];
        this._service.getPolicyAll().subscribe(function (data) {
            _this.rows = data;
            _this.loadingIndicator = false;
        });
    };
    PolicyListComponent.prototype.create = function () {
        var datas = {
            result: {
                name: "",
                shared: false,
                config: {
                    twaf_secrules: {
                        state: true,
                        reqbody_state: true,
                        reqbody_limit: 131072,
                        body_filter_state: false,
                        respbody_limit: 128,
                        intelligent_behavior_detection: true,
                        disable_vars: ["REQBODY_ERROR", "MULTIPART_STRICT_ERROR"],
                        action: 'deny',
                        protection_level: 9,
                        action_meta: "403"
                    },
                    twaf_anti_hotlink: {
                        state: false,
                        mode: 'referer',
                        action: 'deny',
                        action_meta: "403",
                        uri_ext: ["html", "js", "css", "txt", "jsp", "png"],
                        exclude: [],
                        entry: []
                    },
                    twaf_limit_conn: {
                        state: true,
                        trigger_thr: {
                            req_flow_max: 314572800,
                            req_count_max: 10000
                        },
                        clean_thr: {
                            req_max: 50,
                            new_conn_max: 40,
                            conn_max: 100,
                            uri_frequency_max: 3000
                        },
                        action: 'reset_connection',
                        action_meta: "403"
                    },
                    twaf_anti_mal_crawler: {
                        state: true,
                        force_scan_robots_state: true,
                        action: 'deny',
                        action_meta: "403"
                    },
                    twaf_cookie_guard: {
                        state: false,
                        anti_tamper_state: true,
                        anti_tamper_mode: "suffix",
                        anti_tamper_exclude: [],
                        crypt_state: false,
                        crypt_exclude: [],
                        action: 'deny',
                        action_meta: "403",
                        cookie: { Secure: false, HttpOnly: false },
                        cookie_key: "cookieguard"
                        // http_only_state: true
                    },
                    twaf_attack_response: {
                        detail_state: false
                    },
                }
            }
        };
        var initialState = {
            datas: datas,
            // toastr: this.toastr,
            thats: this
        };
        this.bsModalRef = this.modalService.show(_modal_content_policy_component__WEBPACK_IMPORTED_MODULE_4__["ModalContentPolicyComponent"], Object.assign({ initialState: initialState }, { class: 'modal-lg' }));
        this.bsModalRef.content.title = '添加策略';
        this.bsModalRef.content.closeBtnName = '关闭';
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["DatatableComponent"]),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_1__["DatatableComponent"])
    ], PolicyListComponent.prototype, "table", void 0);
    PolicyListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-policy-list',
            template: __webpack_require__(/*! ./policy-list.component.html */ "./src/app/pages/policy/policy-list/policy-list.component.html"),
            providers: [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalRef"]]
        }),
        __metadata("design:paramtypes", [_policy_service__WEBPACK_IMPORTED_MODULE_5__["PolicyService"],
            _server_server_service__WEBPACK_IMPORTED_MODULE_6__["ServerService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalRef"]])
    ], PolicyListComponent);
    return PolicyListComponent;
}());



/***/ }),

/***/ "./src/app/pages/policy/policy.class.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/policy/policy.class.ts ***!
  \**********************************************/
/*! exports provided: PolicyClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PolicyClass", function() { return PolicyClass; });
var PolicyClass = /** @class */ (function () {
    function PolicyClass() {
        this.config = {
            twaf_secrules: {
                state: true,
                reqbody_state: true,
                reqbody_limit: 131072,
                body_filter_state: false,
                respbody_limit: 128,
                intelligent_behavior_detection: true,
                disable_vars: ["REQBODY_ERROR", "MULTIPART_STRICT_ERROR"],
                action: 'deny',
                protection_level: 9,
                action_meta: "403"
            },
            twaf_anti_hotlink: {
                state: false,
                mode: 'referer',
                action: 'deny',
                action_meta: "403",
                uri_ext: ["html", "js", "css", "txt", "jsp", "png"],
                exclude: [],
                entry: []
            },
            twaf_limit_conn: {
                state: true,
                trigger_thr: {
                    req_flow_max: 314572800,
                    req_count_max: 10000
                },
                clean_thr: {
                    req_max: 50,
                    new_conn_max: 40,
                    conn_max: 100,
                    uri_frequency_max: 3000
                },
                action: 'reset_connection',
                action_meta: "403"
            },
            twaf_anti_mal_crawler: {
                state: true,
                force_scan_robots_state: true,
                action: 'deny',
                action_meta: "403"
            }
        };
    }
    return PolicyClass;
}());



/***/ }),

/***/ "./src/app/pages/policy/policy.component.html":
/*!****************************************************!*\
  !*** ./src/app/pages/policy/policy.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-lg-12\">\n    <app-policy-list></app-policy-list>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/policy/policy.component.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/policy/policy.component.ts ***!
  \**************************************************/
/*! exports provided: PolicyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PolicyComponent", function() { return PolicyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _policy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./policy.service */ "./src/app/pages/policy/policy.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PolicyComponent = /** @class */ (function () {
    function PolicyComponent(_service, _router) {
        this._service = _service;
        this._router = _router;
        this.state = {
            tabs: {
                demo1: 0,
            }
        };
    }
    PolicyComponent.prototype.ngOnInit = function () {
    };
    PolicyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-policy',
            template: __webpack_require__(/*! ./policy.component.html */ "./src/app/pages/policy/policy.component.html"),
            styleUrls: []
        }),
        __metadata("design:paramtypes", [_policy_service__WEBPACK_IMPORTED_MODULE_2__["PolicyService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], PolicyComponent);
    return PolicyComponent;
}());



/***/ }),

/***/ "./src/app/pages/policy/policy.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/policy/policy.module.ts ***!
  \***********************************************/
/*! exports provided: PolicyModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PolicyModule", function() { return PolicyModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _policy_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./policy.routing */ "./src/app/pages/policy/policy.routing.ts");
/* harmony import */ var _policy_list_policy_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./policy-list/policy-list.component */ "./src/app/pages/policy/policy-list/policy-list.component.ts");
/* harmony import */ var _policy_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./policy.component */ "./src/app/pages/policy/policy.component.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _secrules_secrules_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./secrules/secrules.component */ "./src/app/pages/policy/secrules/secrules.component.ts");
/* harmony import */ var _antilink_antilink_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./antilink/antilink.component */ "./src/app/pages/policy/antilink/antilink.component.ts");
/* harmony import */ var _limitconn_limitconn_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./limitconn/limitconn.component */ "./src/app/pages/policy/limitconn/limitconn.component.ts");
/* harmony import */ var _antidetection_antidetection_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./antidetection/antidetection.component */ "./src/app/pages/policy/antidetection/antidetection.component.ts");
/* harmony import */ var _policy_list_modal_content_policy_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./policy-list/modal-content-policy.component */ "./src/app/pages/policy/policy-list/modal-content-policy.component.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var _theme_theme_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../@theme/theme.module */ "./src/app/@theme/theme.module.ts");
/* harmony import */ var angular2_tag_input_dist__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! angular2-tag-input/dist */ "./node_modules/angular2-tag-input/dist/index.js");
/* harmony import */ var angular2_tag_input_dist__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(angular2_tag_input_dist__WEBPACK_IMPORTED_MODULE_12__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var PolicyModule = /** @class */ (function () {
    function PolicyModule() {
    }
    PolicyModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_10__["ModalModule"].forRoot(),
                _theme_theme_module__WEBPACK_IMPORTED_MODULE_11__["ThemeModule"],
                _policy_routing__WEBPACK_IMPORTED_MODULE_1__["PolicyRouting"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"],
                angular2_tag_input_dist__WEBPACK_IMPORTED_MODULE_12__["RlTagInputModule"],
            ],
            declarations: [
                _policy_list_policy_list_component__WEBPACK_IMPORTED_MODULE_2__["PolicyListComponent"], _policy_list_modal_content_policy_component__WEBPACK_IMPORTED_MODULE_9__["ModalContentPolicyComponent"], _policy_component__WEBPACK_IMPORTED_MODULE_3__["PolicyComponent"],
                _secrules_secrules_component__WEBPACK_IMPORTED_MODULE_5__["SecrulesComponent"], _antilink_antilink_component__WEBPACK_IMPORTED_MODULE_6__["AntilinkComponent"], _limitconn_limitconn_component__WEBPACK_IMPORTED_MODULE_7__["LimitconnComponent"], _antidetection_antidetection_component__WEBPACK_IMPORTED_MODULE_8__["AntidetectionComponent"]
            ],
            entryComponents: [_policy_list_modal_content_policy_component__WEBPACK_IMPORTED_MODULE_9__["ModalContentPolicyComponent"]]
        })
    ], PolicyModule);
    return PolicyModule;
}());



/***/ }),

/***/ "./src/app/pages/policy/policy.routing.ts":
/*!************************************************!*\
  !*** ./src/app/pages/policy/policy.routing.ts ***!
  \************************************************/
/*! exports provided: PolicyRouting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PolicyRouting", function() { return PolicyRouting; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _policy_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./policy.component */ "./src/app/pages/policy/policy.component.ts");
/* harmony import */ var _secrules_secrules_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./secrules/secrules.component */ "./src/app/pages/policy/secrules/secrules.component.ts");
/* harmony import */ var _antilink_antilink_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./antilink/antilink.component */ "./src/app/pages/policy/antilink/antilink.component.ts");
/* harmony import */ var _limitconn_limitconn_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./limitconn/limitconn.component */ "./src/app/pages/policy/limitconn/limitconn.component.ts");
/* harmony import */ var _antidetection_antidetection_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./antidetection/antidetection.component */ "./src/app/pages/policy/antidetection/antidetection.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        component: _policy_component__WEBPACK_IMPORTED_MODULE_2__["PolicyComponent"],
    },
    {
        path: 'edit/:_id',
        component: _secrules_secrules_component__WEBPACK_IMPORTED_MODULE_3__["SecrulesComponent"],
        data: {
            pageTitle: '编辑',
        },
    },
    {
        path: 'secrules/:_id',
        component: _secrules_secrules_component__WEBPACK_IMPORTED_MODULE_3__["SecrulesComponent"],
        data: {
            pageTitle: '攻击防护',
        },
    },
    {
        path: 'antilink/:_id',
        component: _antilink_antilink_component__WEBPACK_IMPORTED_MODULE_4__["AntilinkComponent"],
        data: {
            pageTitle: '防信息滥用',
        },
    },
    {
        path: 'limitconn/:_id',
        component: _limitconn_limitconn_component__WEBPACK_IMPORTED_MODULE_5__["LimitconnComponent"],
        data: {
            pageTitle: '防CC',
        },
    },
    {
        path: 'antidetection/:_id',
        component: _antidetection_antidetection_component__WEBPACK_IMPORTED_MODULE_6__["AntidetectionComponent"],
        data: {
            pageTitle: '防探测',
        },
    },
];
var PolicyRouting = /** @class */ (function () {
    function PolicyRouting() {
    }
    PolicyRouting = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], PolicyRouting);
    return PolicyRouting;
}());



/***/ }),

/***/ "./src/app/pages/policy/policy.service.ts":
/*!************************************************!*\
  !*** ./src/app/pages/policy/policy.service.ts ***!
  \************************************************/
/*! exports provided: PolicyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PolicyService", function() { return PolicyService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _theme_http_basichttp_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../@theme/http/basichttp.service */ "./src/app/@theme/http/basichttp.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PolicyService = /** @class */ (function () {
    function PolicyService(_basicHttpService) {
        this._basicHttpService = _basicHttpService;
        this.policyUrl = '/policy';
        // policy
        this.getPolicyAll = function () {
            var opt = this._basicHttpService.NewReqOpts();
            return this._basicHttpService.MyPolicy(this.policyUrl, opt);
        };
    }
    PolicyService.prototype.getPolicy = function (id) {
        var opt = this._basicHttpService.NewReqOpts();
        return this._basicHttpService.MyGet(this.policyUrl + '/' + id, opt);
    };
    PolicyService.prototype.addPolicy = function (uuid, data) {
        var opt = this._basicHttpService.NewReqOpts();
        return this._basicHttpService.MyPost(this.policyUrl + '/' + uuid, data, opt, true);
    };
    PolicyService.prototype.setPolicy = function (id, data) {
        var opt = this._basicHttpService.NewReqOpts();
        return this._basicHttpService.MyPut(this.policyUrl + '/' + id, data, opt, true);
    };
    PolicyService.prototype.deletePolicy = function (id) {
        var opt = this._basicHttpService.NewReqOpts();
        return this._basicHttpService.MyDelete(this.policyUrl + '/' + id, opt, true);
    };
    PolicyService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_theme_http_basichttp_service__WEBPACK_IMPORTED_MODULE_1__["BasicHttpService"]])
    ], PolicyService);
    return PolicyService;
}());



/***/ }),

/***/ "./src/app/pages/policy/secrules/secrules.component.css":
/*!**************************************************************!*\
  !*** ./src/app/pages/policy/secrules/secrules.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/policy/secrules/secrules.component.html":
/*!***************************************************************!*\
  !*** ./src/app/pages/policy/secrules/secrules.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"content\">\n  <div class=\"row\">\n    <!-- NEW WIDGET START -->\n    <article class=\"col-sm-12 col-md-12 col-lg-12\">\n      <!-- Widget ID (each widget will need unique ID)-->\n      <div>\n        <!-- widget div-->\n          <!-- widget content -->\n          <div class=\"widget-body\" style=\"padding: 0 0 0 0px; background: #fff; border-radius: 0.25rem;\">\n            <ul id=\"myTab1\" class=\"nav nav-tabs bordered\">\n              <li [class.active]=true>\n                <a routerLink=\"/pages/policy/secrules/{{_id}}\">攻击防护</a>\n              </li>\n              <li [class.active]=false>\n                <a routerLink=\"/pages/policy/antilink/{{_id}}\">防信息滥用</a>\n              </li>\n              <li [class.active]=false>\n                <a routerLink=\"/pages/policy/limitconn/{{_id}}\">防CC</a>\n              </li>\n              <li [class.active]=false>\n                <a routerLink=\"/pages/policy/antidetection/{{_id}}\">防探测</a>\n              </li>\n            </ul>\n            <div class=\"padding-top-10 col-md-12\" style=\"background: #fff;\">\n              <form class=\"form-horizontal\"\n                    #secrulesForm=\"ngForm\">\n                  <div class=\"col-md-12\">\n                <div class=\"form-group col-md-12\" style=\"padding-top: 20px;\">\n                  <legend>基本配置</legend>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"col-md-4 control-label\">\n                    状态\n                  </div>\n                  <div class=\"col-md-8\">\n                    <label class=\"radio radio-inline\">\n                      <input type=\"radio\" name=\"state_secrules\" id=\"states_1\"\n                             (click)=\"setStateSecrulesState(true)\"\n                             [checked]=\"datas.config.twaf_secrules.state\"\n                             value=\"1\">\n                      开 </label>\n                    <label class=\"radio radio-inline\">\n                      <input type=\"radio\" name=\"state_secrules\" id=\"states_0\"\n                             (click)=\"setStateSecrulesState(false)\"\n                             [checked]=\"!datas.config.twaf_secrules.state\"\n                             value=\"0\">\n                      关 </label>\n                  </div>\n                </div>\n\n                <div class=\"form-group\">\n                  <label class=\"col-md-4 control-label\">防护级别</label>\n                  <div class=\"col-md-2\">\n                    <select name=\"protection_level\" id=\"protection_level\" class=\"form-control\"\n                            [(ngModel)]=\"datas.config.twaf_secrules.protection_level\">\n                        <option class=\"col-md-1\"\n                                *ngFor=\"let item of protection_level_list\"\n                                [value]=\"item.value\"\n                        >{{item.name}}\n                        </option>\n                    </select>\n                  </div>\n                </div>\n\n                <div class=\"form-group col-md-12\">\n                  <legend>高级参数</legend>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"col-md-4 control-label\">检测内容</div>\n                <div class=\"form-group\">\n                  <div class=\"col-md-4\">\n                    <div class=\"checkbox\">\n                      <label>\n                        <input\n                                id=\"cookie_detect\"\n                                name = \"cookie_detect\"\n                                [(ngModel)]=\"tmp.cookie_detect\"\n                                [checked]=\"tmp.cookie_detect\"\n                                type=\"checkbox\"\n                        />检测COOKIE中是否包含攻击内容\n                      </label>\n                    </div>\n                    <div class=\"checkbox\">\n                      <label>\n                        <input\n                                id=\"reqbody_state\"\n                                name = \"reqbody_state\"\n                                [(ngModel)]=\"datas.config.twaf_secrules.reqbody_state\"\n                                [checked]=\"datas.config.twaf_secrules.reqbody_state\"\n                                type=\"checkbox\"\n\n                        />检测请求体中是否包含攻击内容\n                      </label>\n                    </div>\n                  </div>\n                </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"rowGroup\">\n                        <label class=\"col-md-4 control-label\">请求体检测阈值</label>\n                        <div class=\"col-md-2\" >\n                            <input\n\n                                    type=\"number\"\n                                    name=\"reqbody_limit\"\n                                    id=\"reqbody_limit\"\n                                    [(ngModel)]=\"datas.config.twaf_secrules.reqbody_limit\"\n                                    class=\"form-control\"\n                            />\n                        </div>\n                        <div class=\"col-md-1\" style=\"padding-top: 5px;\">KB</div>\n                    </div>\n                </div>\n                <div class=\"form-actions tt-form-actions-center\" style=\"padding-bottom: 25px; padding-top: 15px;\">\n                  <footer>\n                    <button type=\"submit\" class=\"btn tt-btn-info btn-sm\" (click)=\"submit(secrulesForm)\">\n                      确 认\n                    </button>&nbsp;&nbsp;\n                    <button type=\"button\" class=\"btn tt-btn-info btn-sm\" [routerLink]=\"['/pages/policy']\">\n                      取 消\n                    </button>\n                  </footer>\n                </div>\n                </div>\n            </form>\n\n          </div>\n          <!-- end widget content -->\n        </div>\n        <!-- end widget div -->\n      </div>\n      <!-- end widget -->\n    </article>\n    <!-- WIDGET END -->\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/pages/policy/secrules/secrules.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/policy/secrules/secrules.component.ts ***!
  \*************************************************************/
/*! exports provided: SecrulesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecrulesComponent", function() { return SecrulesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _policy_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../policy.class */ "./src/app/pages/policy/policy.class.ts");
/* harmony import */ var _policy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../policy.service */ "./src/app/pages/policy/policy.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SecrulesComponent = /** @class */ (function () {
    function SecrulesComponent(_router, _service, _activatedRoute) {
        this._router = _router;
        this._service = _service;
        this._activatedRoute = _activatedRoute;
        this.datas = new _policy_class__WEBPACK_IMPORTED_MODULE_2__["PolicyClass"]();
        this.tmp = [];
        this.protection_level_list = [
            { 'name': '关键防护', 'value': '9' },
            { 'name': '均衡防护', 'value': '5' },
            { 'name': '全面防护', 'value': '1' },
        ];
        this.codeList = [
            { value: "400", text: "400" },
            { value: "401", text: "401" },
            { value: "403", text: "403" },
            { value: "404", text: "404" },
            { value: "405", text: "405" },
            { value: "410", text: "410" },
            { value: "500", text: "500" },
            { value: "501", text: "501" },
            { value: "503", text: "503" },
            { value: "504", text: "504" }
        ];
    }
    SecrulesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 初始化表单数据
        this._activatedRoute.params.subscribe(function (params) {
            _this._id = params['_id'];
            if (_this._id) {
                _this._service.getPolicy(_this._id).subscribe(function (data) {
                    _this.datas.config = data['result'];
                    _this.tmp.name = data['result']['name'];
                    _this.tmp.ignore_data = true;
                    _this.tmp.cookie_detect = true;
                    if (data['result'].twaf_secrules.disable_vars.indexOf("REQBODY_ERROR") < 0) {
                        _this.tmp.ignore_data = false;
                    } // 不在数组中,即不失效 == 不丢弃异常请求
                    if (data['result'].twaf_secrules.disable_vars.indexOf("REQUEST_COOKIES") >= 0) {
                        _this.tmp.cookie_detect = false;
                    } // 在数组中，不检测cookie中是否包含
                });
            }
        });
    };
    SecrulesComponent.prototype.setStateSecrulesState = function (value) {
        this.datas.config.twaf_secrules.state = value;
    };
    SecrulesComponent.prototype.submit = function () {
        this.datas.config.twaf_secrules.disable_vars = [];
        var that = this;
        if (this.tmp.ignore_data) {
            this.datas.config.twaf_secrules.disable_vars.push("REQBODY_ERROR");
            this.datas.config.twaf_secrules.disable_vars.push("MULTIPART_STRICT_ERROR");
        }
        if (!this.tmp.cookie_detect) {
            this.datas.config.twaf_secrules.disable_vars.push("REQUEST_COOKIES");
        }
        this._service.setPolicy(this._id, this.datas).subscribe(function (res) {
            if (res['success']) {
                // this.toastr.success('编辑成功！', '');
                // 延迟1s 后跳转至列表页面
                setTimeout(function () {
                    that._router.navigate(['pages', 'policy']); // 为什么用that ： this容易找不到指代的是谁
                }, '1000');
            }
            else {
                // this.toastr.error('编辑失败！', '');
            }
        }, function (error) {
            // this.toastr.error('编辑失败！', '');
        });
    };
    SecrulesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-secrules',
            template: __webpack_require__(/*! ./secrules.component.html */ "./src/app/pages/policy/secrules/secrules.component.html"),
            styles: [__webpack_require__(/*! ./secrules.component.css */ "./src/app/pages/policy/secrules/secrules.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _policy_service__WEBPACK_IMPORTED_MODULE_3__["PolicyService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], SecrulesComponent);
    return SecrulesComponent;
}());



/***/ })

}]);
//# sourceMappingURL=policy-policy-module.js.map