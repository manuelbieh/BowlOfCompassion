module.exports.register = function (Handlebars, options)  {

  Handlebars.registerHelper('pagemeta', function (meta)  {

	if(meta) {

		// this.page = meta;
		this.pagemeta = meta;

		if(this.menu && this.menu.items) {

			this.menu.items.forEach(function(item) {

				// console.log(meta.active, item.href, meta.active.indexOf(item.href) > -1);
				// console.log(meta.active, item.id, meta.active && meta.active.indexOf(item.id));
				if(meta.active && (meta.active.indexOf(item.href) > -1 || meta.active.indexOf(item.id) > -1)) {
					item.active = true;
				}

				if(item.items) {

					item.items.forEach(function(subitem) {
						if(meta.active && (meta.active.indexOf(subitem.href) > -1 || meta.active.indexOf(subitem.id) > -1)) {
							subitem.active = true;
						}
					});

				}

			});

		}

		if(typeof meta.category !== 'undefined') {
			this.category = meta.category;
		}

		if(typeof meta.title !== 'undefined') {
			this.title = meta.title;
		}

        if(typeof meta.description !== 'undefined') {
			this.description = meta.description;
		}

        if(typeof meta.keywords !== 'undefined') {
			this.keywords = meta.keywords;
		}

		if(typeof meta.filename !== 'undefined') {
			this.pagination.index.dest = this.pagination.index.filePair.orig.dest + '/' + meta.filename
		}

	}

  });

};
