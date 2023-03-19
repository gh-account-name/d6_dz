const serverPath = 'https://intership-liga.ru';

interface ResponseTask {
  name: string;
  info: string;
  isImportant?: boolean;
  isCompleted?: boolean;
  id: number;
}

type Task = Omit<ResponseTask, 'id'>;

async function makeRequest(method: string, url: string, body?: Task, message?: string): Promise<void> {
  let response: Response;
  if (body) {
    response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(url, { method: method });
  }

  if (response.ok) {
    const data: ResponseTask = await response.json();
    console.log(message, data);
  } else {
    console.log('Ошибка HTTP: ' + response.status);
  }
}

const newTask: Task = {
  'name': 'Wash dishes',
  'info': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'isImportant': true,
};

const patchedTask: Task = {
  'name': 'Wash dishes (patched)',
  'info': 'patched info',
  'isImportant': true,
  'isCompleted': false,
};

// получение таска по id
makeRequest('GET', serverPath + '/tasks/675', undefined, 'запрос на получение таска по id');

// патч таска по id
makeRequest('PATCH', serverPath + '/tasks/676', patchedTask, 'запрос на патч таска по id');

// удаление таска по id
makeRequest('DELETE', serverPath + '/tasks/683', undefined, 'запрос на удаление таска по id');

// получение всех тасков
makeRequest('GET', serverPath + '/tasks', undefined, 'запрос на получение всех тасков');

// получение всех важных тасков
makeRequest('GET', serverPath + '/tasks?isImportant=true', undefined, 'запрос на получение всех важных тасков');

// получение всех неважных тасков имя которых содержит строку 'ing'
makeRequest(
  'GET',
  serverPath + '/tasks?isImportant=false&name_like=ing',
  undefined,
  'запрос на получение всех неважных тасков имя которых содержит строку "ing"'
);

// создание таска
makeRequest('POST', serverPath + '/tasks', newTask, 'запрос на создание таска');
