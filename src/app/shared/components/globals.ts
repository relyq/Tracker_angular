import { MatTableDataSource } from '@angular/material/table';

export const baseUrl: string = 'https://localhost:7004';

export function keydown(event: Event, onSubmit: Function): void {
  const ctrlInputs = [
    'description',
    'content',
    'assignee',
    'organization',
    'role'
  ];

  if ((event as KeyboardEvent).key === 'Enter') {
    if (!ctrlInputs.includes((event.target as HTMLTextAreaElement).name)) {
      onSubmit();
    }
    if ((event as KeyboardEvent).ctrlKey) {
      onSubmit();
    }
  }
}

export function searchFilter(
  event: Event,
  dataSource: MatTableDataSource<any>
): void {
  const filterValue = (event.target as HTMLInputElement).value;
  dataSource.filter = filterValue.trim().toLowerCase();
}

// this is meant to be used with innerHTML so i'll just \n to <br>
export function urlify(str: string): string {
  let rgx = new RegExp(
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/
  );

  str = str.replace(rgx, (rgx) => `<a href="${rgx}">${rgx}</a>`);

  str = str.replace(new RegExp(/(?:\r\n|\r|\n)/g), '<br>');

  return str;
}
