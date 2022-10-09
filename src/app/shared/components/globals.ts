export const baseUrl: string = 'https://localhost:7004';

export function keydown(event: Event, onSubmit: Function): void {
  if ((event as KeyboardEvent).key === 'Enter') {
    if (
      (event.target as HTMLTextAreaElement).name != 'description' &&
      (event.target as HTMLTextAreaElement).name != 'content'
    ) {
      onSubmit();
    }
    if ((event as KeyboardEvent).ctrlKey) {
      onSubmit();
    }
  }
}
