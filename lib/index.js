"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const serverPath = 'https://intership-liga.ru';
function makeRequest(method, url, body, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        if (body) {
            response = yield fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        }
        else {
            response = yield fetch(url, { method: method });
        }
        if (response.ok) {
            const data = yield response.json();
            console.log(message, data);
        }
        else {
            console.log('Ошибка HTTP: ' + response.status);
        }
    });
}
const newTask = {
    'name': 'Wash dishes',
    'info': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'isImportant': true,
};
const patchedTask = {
    'name': 'Wash dishes (patched)',
    'info': 'patched info',
    'isImportant': true,
    'isCompleted': false,
};
makeRequest('GET', serverPath + '/tasks/675', undefined, 'запрос на получение таска по id');
makeRequest('PATCH', serverPath + '/tasks/676', patchedTask, 'запрос на патч таска по id');
makeRequest('DELETE', serverPath + '/tasks/683', undefined, 'запрос на удаление таска по id');
makeRequest('GET', serverPath + '/tasks', undefined, 'запрос на получение всех тасков');
makeRequest('GET', serverPath + '/tasks?isImportant=true', undefined, 'запрос на получение всех важных тасков');
makeRequest('GET', serverPath + '/tasks?isImportant=false&name_like=ing', undefined, 'запрос на получение всех неважных тасков имя которых содержит строку "ing"');
makeRequest('POST', serverPath + '/tasks', newTask, 'запрос на создание таска');
//# sourceMappingURL=index.js.map