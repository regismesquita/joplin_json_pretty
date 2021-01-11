import joplin from 'api';
import { MenuItemLocation, ToolbarButtonLocation } from 'api/types';

joplin.plugins.register({
	onStart: async function() {

    await joplin.commands.register({
			name: "PrettifyJson",
      label: "PrettifyJson",
			execute: async () => {
        // runNoteJs();
        // Get the current note from the workspace.
        const note = await joplin.workspace.selectedNote();
        // Keep in mind that it can be `null` if nothing is currently selected!
        if (note) {
          // Only run if title matches this :
          //if (note.title.includes('[json]')){
            console.info('Note content has changed! New note is:', note);
            var obj = JSON.parse(note.body);
            var newBody = JSON.stringify(obj, null, 2);
            await joplin.data.put(['notes', note.id], null, { body: newBody});
            await joplin.commands.execute('newNote', note.id);
            await joplin.commands.execute('openNote', note.id);
         // }
        }
        else {
          console.info('No note is selected');
        }
			}
		});

		await joplin.views.menuItems.create('myMenuItem1', 'PrettifyJson', MenuItemLocation.Tools, { accelerator: 'Ctrl+P' });
	},
});
