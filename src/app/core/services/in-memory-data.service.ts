import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Project } from '../models/project';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const projects = [
      {
        id: 2,
        name: 'test project',
        description: 'here i do testing',
        created: '2022-04-28T09:15:29.1217435',
        authorid: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922'
      },
      {
        id: 4,
        name: 'Tracker',
        description: 'this',
        created: '2022-04-13T02:24:35.4136416',
        authorid: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922'
      }
    ];

    const tickets = [
      {
        id: 9,
        projectId: 2,
        title: 'first ticket',
        description: 'asdf',
        priority: 1,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: '2619a931-79eb-4d5c-82cc-7918c9ebc726',
        assignee: 'NicolasAMainenti@gmail.com',
        created: '2022-04-12T14:49:37.5494115',
        closed: '2022-04-17T20:33:02.663027'
      },
      {
        id: 12,
        projectId: 2,
        title: 'first ticket',
        description: 'asdf',
        priority: 1,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: '2619a931-79eb-4d5c-82cc-7918c9ebc726',
        assignee: 'NicolasAMainenti@gmail.com',
        created: '2022-04-12T16:37:33.0968209',
        closed: '2022-04-18T00:12:31.5974932'
      },
      {
        id: 14,
        projectId: 4,
        title: 'show ticket project on tickets list',
        description: 'project is not shown currently',
        priority: 1,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:25:32.7447608',
        closed: '2022-04-17T20:36:29.7215007'
      },
      {
        id: 15,
        projectId: 4,
        title: 'usernames',
        description: 'get actual usernames instead of emails',
        priority: 1,
        type: 'issue',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:26:11.6310237',
        closed: null
      },
      {
        id: 16,
        projectId: 4,
        title: 'ticket date closed',
        description: 'record and show date closed if ticket is closed',
        priority: 3,
        type: 'feature request',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:26:47.1763291',
        closed: '2022-04-17T20:37:00.6455217'
      },
      {
        id: 17,
        projectId: 4,
        title: 'ticket history',
        description: 'record ticket changes',
        priority: 2,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:27:36.054096',
        closed: null
      },
      {
        id: 18,
        projectId: 4,
        title: 'assignee search',
        description:
          'change assignee dropdown list to a search bar, so when you start writing a username it filters in real time',
        priority: 1,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:28:49.5924889',
        closed: null
      },
      {
        id: 19,
        projectId: 4,
        title: 'ticket comments',
        description: 'implement ticket comments',
        priority: 1,
        type: 'feature request',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:30:00.698356',
        closed: '2022-04-28T12:14:50.9268212'
      },
      {
        id: 20,
        projectId: 4,
        title: 'shared create and edit pages',
        description:
          "i should maybe use a single page for create and edit as they are pretty much the same, just disabling the fields i don't want to make available in the edit page",
        priority: 1,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:31:19.8715509',
        closed: null
      },
      {
        id: 21,
        projectId: 4,
        title: 'ticket description box',
        description: 'description box should be bigger or adapt to text length',
        priority: 1,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:31:41.3861111',
        closed: '2022-04-28T13:20:11.3615528'
      },
      {
        id: 22,
        projectId: 4,
        title: 'multiple assignees',
        description:
          'it should be possible to assign multiple users to a ticket',
        priority: 1,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:32:56.3451658',
        closed: null
      },
      {
        id: 23,
        projectId: 4,
        title: 'fix ticket status on create',
        description:
          "it shouldn't be possible to create a ticket as closed lol",
        priority: 1,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:33:34.0891838',
        closed: '2022-04-22T09:40:57.2046089'
      },
      {
        id: 24,
        projectId: 4,
        title: 'version number',
        description: 'think of some versioning system and implement it',
        priority: 1,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:36:08.6048491',
        closed: null
      },
      {
        id: 25,
        projectId: 4,
        title: 'sort tickets',
        description: 'sort tickets by project, date, priority, etc',
        priority: 5,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:42:29.5169468',
        closed: null
      },
      {
        id: 26,
        projectId: 4,
        title: 'utc datetime',
        description:
          "dates and time should be stored as utc and be displayed according to user's set timezone",
        priority: 1,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:43:46.4701074',
        closed: null
      },
      {
        id: 27,
        projectId: 4,
        title: 'admin & user zones',
        description: 'create admin & user zones',
        priority: 1,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:44:16.4117471',
        closed: null
      },
      {
        id: 28,
        projectId: 4,
        title: 'ticket status CRUD',
        description: 'add ticket status CRUD',
        priority: 1,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:45:04.37541',
        closed: null
      },
      {
        id: 29,
        projectId: 4,
        title: 'ticket type CRUD',
        description: 'add ticket type CRUD',
        priority: 1,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:45:17.7752499',
        closed: null
      },
      {
        id: 30,
        projectId: 4,
        title: 'edit is currently not working',
        description:
          "it's probably due to some model binding issue related to projectid or something",
        priority: 4,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:49:23.7801412',
        closed: '2022-04-17T20:38:10.2823996'
      },
      {
        id: 31,
        projectId: 4,
        title: 'close ticket button',
        description:
          'there should a "close ticket" button to close it without going to the edit page',
        priority: 3,
        type: 'feature request',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-13T02:50:43.7260772',
        closed: '2022-04-22T09:40:49.8410495'
      },
      {
        id: 33,
        projectId: 4,
        title: 'add TicketStatusHistory',
        description:
          'should be a table with columns Id(PK), TicketId(FK), TicketStatusId(FK), Modified',
        priority: 2,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-17T20:26:22.9084724',
        closed: null
      },
      {
        id: 38,
        projectId: 4,
        title: 'project page',
        description: 'project page with ticket list',
        priority: 4,
        type: 'feature request',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-19T01:09:20.3880199',
        closed: '2022-04-19T02:42:53.7859401'
      },
      {
        id: 39,
        projectId: 4,
        title: 'ticket page',
        description: 'ticket page showing ticket details and edit',
        priority: 4,
        type: 'feature request',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-19T01:09:53.0347963',
        closed: '2022-04-22T09:42:07.013719'
      },
      {
        id: 40,
        projectId: 4,
        title: 'create ticket from project page',
        description: '.',
        priority: 4,
        type: 'feature request',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-19T01:10:16.383767',
        closed: '2022-04-19T02:44:28.7235512'
      },
      {
        id: 41,
        projectId: 4,
        title: 'fix routing',
        description:
          'set routing for all pages to be in the format of /Projects/[id]/Tickets/[id]',
        priority: 4,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-19T01:34:15.8187489',
        closed: '2022-04-22T09:42:12.3249994'
      },
      {
        id: 42,
        projectId: 2,
        title: 'tasdas',
        description: 'asease',
        priority: 1,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-19T01:38:41.9796945',
        closed: '2022-04-22T09:36:54.3609228'
      },
      {
        id: 43,
        projectId: 2,
        title: 'tasdas',
        description: 'asease',
        priority: 1,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-19T01:40:21.8685812',
        closed: '2022-04-22T09:37:05.4205514'
      },
      {
        id: 44,
        projectId: 2,
        title: 'tasdas',
        description: 'asease',
        priority: 1,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-19T01:41:14.1805342',
        closed: '2022-04-22T09:39:07.9831156'
      },
      {
        id: 45,
        projectId: 2,
        title: 'tasdas',
        description: 'asease',
        priority: 1,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-19T01:42:40.5537927',
        closed: '2022-04-24T07:37:08.6642103'
      },
      {
        id: 53,
        projectId: 4,
        title: 'project page menu',
        description:
          'project page should be a menu and the list of tickets should be on /Projects/[id]/Tickets/',
        priority: 3,
        type: 'feature request',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-19T02:44:17.5734886',
        closed: '2022-04-20T00:23:16.2610693'
      },
      {
        id: 54,
        projectId: 4,
        title: 'remove ticket page',
        description: '.',
        priority: 1,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-19T02:45:50.2405437',
        closed: '2022-04-19T18:21:53.0349202'
      },
      {
        id: 56,
        projectId: 4,
        title: 'move ticket buttons to ticket page',
        description:
          'move edit, delete, to ticket page, and remove details as it should just be the ticket page. maybe keep delete button outside just to be able to delete tickets from the list page',
        priority: 3,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-20T00:33:05.0445207',
        closed: '2022-04-22T09:50:13.0141865'
      },
      {
        id: 57,
        projectId: 4,
        title: 'email confirmation',
        description: 'get email confirmation when registering working ',
        priority: 1,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-21T16:53:20.071577',
        closed: null
      },
      {
        id: 58,
        projectId: 2,
        title: 'comments test',
        description: '.',
        priority: 1,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-24T07:37:34.0295681',
        closed: null
      },
      {
        id: 59,
        projectId: 4,
        title: 'project created date when editing',
        description: 'created date goes null when editing a project',
        priority: 4,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-25T02:06:14.8119485',
        closed: '2022-04-28T13:08:22.7455327'
      },
      {
        id: 60,
        projectId: 4,
        title: 'remove parents from childs',
        description: 'in a separate branch',
        priority: 2,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-25T03:30:53.3850024',
        closed: '2022-04-28T11:41:53.7743112'
      },
      {
        id: 61,
        projectId: 4,
        title: 'Socotroco',
        description: 'Holajajajajaajajjaa',
        priority: 3,
        type: 'feature request',
        status: 'closed',
        submitterId: '4e8311bb-2203-41f5-bdd7-cd0f55c0db24',
        submitter: 'ahorasixd@gmail.com',
        assigneeId: '04d0f010-6c31-46bc-9b14-2a27a6ea7fd8',
        assignee: 'meolvidelacontrasenia@gmail.com',
        created: '2022-04-27T03:33:17.4152771',
        closed: '2022-04-27T16:50:02.4637102'
      },
      {
        id: 62,
        projectId: 2,
        title: 'asdsada',
        description: '12312321asdasd',
        priority: 1,
        type: 'issue',
        status: 'open',
        submitterId: '4e8311bb-2203-41f5-bdd7-cd0f55c0db24',
        submitter: 'ahorasixd@gmail.com',
        assigneeId: '04d0f010-6c31-46bc-9b14-2a27a6ea7fd8',
        assignee: 'meolvidelacontrasenia@gmail.com',
        created: '2022-04-27T03:34:30.4174755',
        closed: null
      },
      {
        id: 63,
        projectId: 4,
        title: 'test ticket close',
        description: '.',
        priority: 3,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-27T04:26:02.6686116',
        closed: '2022-04-27T16:50:41.6017479'
      },
      {
        id: 64,
        projectId: 4,
        title: 'test editing project',
        description: 'rn i think it nulls the created date',
        priority: 3,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-27T04:30:35.6338535',
        closed: '2022-04-28T11:41:10.752214'
      },
      {
        id: 65,
        projectId: 4,
        title: "comment list doesn't reload properly",
        description:
          'probably happens when the reload goes faster than the request',
        priority: 1,
        type: 'issue',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-27T05:42:35.1980184',
        closed: null
      },
      {
        id: 66,
        projectId: 2,
        title: 'asd',
        description: 'faseas',
        priority: 1,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-28T09:17:36.7243404',
        closed: '2022-04-28T09:17:44.5424079'
      },
      {
        id: 67,
        projectId: 2,
        title: 'rawe',
        description: 'ara',
        priority: 1,
        type: 'issue',
        status: 'closed',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-28T09:19:37.7983288',
        closed: '2022-04-28T09:19:52.3607972'
      },
      {
        id: 68,
        projectId: 4,
        title: 'sort closed by closed date',
        description:
          'when showing only closed tickets, sort them by closed date',
        priority: 2,
        type: 'issue',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-04-29T11:23:43.8163531',
        closed: null
      },
      {
        id: 69,
        projectId: 4,
        title: 'user management',
        description:
          'add user management page for admins to assign & claism to users',
        priority: 5,
        type: 'feature request',
        status: 'open',
        submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        submitter: 'relyqx@gmail.com',
        assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        assignee: 'relyqx@gmail.com',
        created: '2022-05-02T14:15:39.5572043',
        closed: null
      }
    ];

    const comments = [
      {
        id: 61,
        ticketId: 65,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'only happens first time after compiling',
        created: '2022-04-27T16:47:59.2154258'
      },
      {
        id: 62,
        ticketId: 63,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'works fine',
        created: '2022-04-27T16:50:47.8852523'
      },
      {
        id: 63,
        ticketId: 62,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'asasd',
        created: '2022-04-27T16:52:42.1248964'
      },
      {
        id: 64,
        ticketId: 62,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'seraweaweasd',
        created: '2022-04-28T11:31:24.7664261'
      },
      {
        id: 65,
        ticketId: 62,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'zzzzzzzzzzz',
        created: '2022-04-28T11:34:19.3495465'
      },
      {
        id: 66,
        ticketId: 64,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'fixed',
        created: '2022-04-28T11:41:08.1148554'
      },
      {
        id: 67,
        ticketId: 60,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: "no need to do this. i'll create dtos instead",
        created: '2022-04-28T11:41:45.8952685'
      },
      {
        id: 68,
        ticketId: 19,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'done',
        created: '2022-04-28T12:14:47.7700513'
      },
      {
        id: 69,
        ticketId: 21,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'can be done with a <textarea>',
        created: '2022-04-28T12:18:18.8544171'
      },
      {
        id: 70,
        ticketId: 62,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'asdaseqweawe',
        created: '2022-04-28T12:31:16.5099817'
      },
      {
        id: 71,
        ticketId: 62,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'qqqqqqqqqqqqqq',
        created: '2022-04-28T12:31:52.4008206'
      },
      {
        id: 72,
        ticketId: 62,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'zzz',
        created: '2022-04-28T12:32:17.2926088'
      },
      {
        id: 73,
        ticketId: 59,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'fixed',
        created: '2022-04-28T13:08:19.954114'
      },
      {
        id: 74,
        ticketId: 21,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'done with a <textarea>',
        created: '2022-04-28T13:20:09.6058529'
      },
      {
        id: 75,
        ticketId: 15,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content:
          "i'm now recording email and username on register, now i need to set up the validation so the username is unique (or let it not be unique and log in with email instead)\nright now i don't check if the username already exists on the db, so when you try to log in there might be two users with the same username and an exception is thrown",
        created: '2022-04-28T15:05:45.8375489'
      },
      {
        id: 76,
        ticketId: 15,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content:
          'https://stackoverflow.com/questions/29094063/how-to-allow-user-to-register-with-duplicate-username-using-identity-framework-1',
        created: '2022-04-28T15:15:48.1772343'
      },
      {
        id: 77,
        ticketId: 69,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'https://github.com/mguinness/IdentityManagerUI',
        created: '2022-05-02T14:15:42.6711107'
      },
      {
        id: 78,
        ticketId: 69,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content:
          'https://codewithmukesh.com/blog/user-management-in-aspnet-core-mvc/',
        created: '2022-05-02T14:18:20.7102836'
      },
      {
        id: 79,
        ticketId: 68,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'asdasd',
        created: '2022-08-27T21:15:28.7406498'
      },
      {
        id: 80,
        ticketId: 70,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content:
          'project CRUD:\ncreate working\nread working\nupdate todo\ndelete working',
        created: '2022-09-01T23:24:10.3612169'
      },
      {
        id: 81,
        ticketId: 62,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'a<br>a',
        created: '2022-09-01T23:24:47.3855218'
      },
      {
        id: 82,
        ticketId: 62,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'a \\n a',
        created: '2022-09-01T23:24:54.7176962'
      },
      {
        id: 83,
        ticketId: 62,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'a </br> a',
        created: '2022-09-01T23:24:59.6708159'
      },
      {
        id: 84,
        ticketId: 62,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'a\n\na',
        created: '2022-09-01T23:25:10.7523949'
      },
      {
        id: 85,
        ticketId: 70,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content:
          'ticket CRUD: create working read working update todo delete working',
        created: '2022-09-01T23:32:56.3467631'
      },
      {
        id: 86,
        ticketId: 70,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'not sure if PATCH works on the frontend',
        created: '2022-09-01T23:33:15.0200096'
      },
      {
        id: 87,
        ticketId: 70,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'ticket close/reopen working',
        created: '2022-09-02T02:28:43.1654438'
      },
      {
        id: 88,
        ticketId: 72,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'projects done',
        created: '2022-09-02T05:19:41.5865987'
      },
      {
        id: 89,
        ticketId: 72,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content:
          'there might be some issues with status and type of tickets - i send it to the web api as strings',
        created: '2022-09-02T05:22:09.6231237'
      },
      {
        id: 90,
        ticketId: 72,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'TICKETS WORKING NOW AS DTOS',
        created: '2022-09-03T07:43:30.315258'
      },
      {
        id: 91,
        ticketId: 89,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content:
          'https://docs.microsoft.com/en-us/aspnet/core/web-api/jsonpatch?view=aspnetcore-6.0',
        created: '2022-09-03T07:56:17.0587829'
      },
      {
        id: 92,
        ticketId: 89,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content:
          'cant figure out how to make PATCH work so im using PUT from now on',
        created: '2022-09-03T22:53:06.1589969'
      },
      {
        id: 94,
        ticketId: 72,
        authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
        parentId: null,
        content: 'comments controller is now all dtos - testing now',
        created: '2022-09-04T00:59:26.2442187'
      }
    ];

    return { projects, tickets, comments };
  }
}
