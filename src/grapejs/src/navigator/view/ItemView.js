define(['backbone', 'text!./../template/item.html','require'], function (Backbone, ItemTemplate, require) {
  return Backbone.View.extend({

    template: _.template(ItemTemplate),

    initialize: function(o) {
      this.opt = o;
      this.config = o.config;
      this.em = o.config.em;
      this.ppfx = this.em.get('Config').stylePrefix;
      this.sorter = o.sorter || {};
      this.pfx = this.config.stylePrefix;
      if(typeof this.model.get('open') == 'undefined')
        this.model.set('open',false);
      this.listenTo(this.model.components, 'remove add change reset', this.checkChildren);
      this.listenTo(this.model, 'destroy remove', this.remove);
      this.listenTo(this.model, 'change:status', this.updateStatus);
      this.listenTo(this.model, 'change:open', this.updateOpening);
      this.className	= this.pfx + 'item no-select';
      this.editBtnCls = this.pfx + 'nav-item-edit';
      this.inputNameCls = this.ppfx + 'nav-comp-name';
      this.caretCls = this.ppfx + 'nav-item-caret';
      this.titleCls = this.pfx + 'title';
      this.customNameProp = 'custom-name';
      this.events = {};
      this.events['click > #'+this.pfx+'btn-eye'] = 'toggleVisibility';
      this.events['click .' + this.caretCls] = 'toggleOpening';
      this.events['click .' + this.titleCls] = 'handleSelect';
      this.events['click .' + this.editBtnCls] = 'handleEdit';
      this.events['blur .' + this.inputNameCls] = 'handleEditEnd';

      this.$el.data('model', this.model);
      this.$el.data('collection', this.model.get('components'));

      if(o.config.sortable)
        this.events['mousedown > #'+this.pfx+'move']	= 'startSort';

      this.delegateEvents();
    },

    /**
     * Handle the edit of the component name
     */
    handleEdit: function(e) {
      e.stopPropagation();
      var inputName = this.getInputName();
      inputName.readOnly = false;
      inputName.focus();
    },

    /**
     * Handle with the end of editing of the component name
     */
    handleEditEnd: function (e) {
      e.stopPropagation();
      var inputName = this.getInputName();
      inputName.readOnly = true;
      this.model.set(this.customNameProp, inputName.value);
    },

    /**
     * Get the input containing the name of the component
     * @return {HTMLElement}
     */
    getInputName: function () {
      if(!this.inputName) {
        this.inputName = this.el.querySelector('.' + this.inputNameCls);
      }
      return this.inputName;
    },

    /**
     * Update item opening
     *
     * @return void
     * */
    updateOpening: function (){
      var opened = this.opt.opened || {};
      var model = this.model;
      if(model.get('open')){
        this.$el.addClass("open");
        this.$caret.addClass('fa-chevron-down');
        opened[model.cid] = model;
      }else{
        this.$el.removeClass("open");
        this.$caret.removeClass('fa-chevron-down');
        delete opened[model.cid];
      }
    },

    /**
     * Toggle item opening
     * @param {Object}	e
     *
     * @return void
     * */
    toggleOpening: function(e){
      e.stopPropagation();

      if(!this.model.components.length)
        return;

      this.model.set('open', !this.model.get('open') );
    },

    /**
     * Handle component selection
     * @return {[type]} [description]
     */
    handleSelect: function (e) {
      e.stopPropagation();
      var em = this.em;

      if(em){
        var model = em.get('selectedComponent');
        if(model){
          model.set('status', '');
        }
        this.model.set('status', 'selected');
        em.set('selectedComponent', this.model);
      }
    },

    /**
     * Delegate to sorter
     * @param	Event
     * */
    startSort: function(e){
      if (this.sorter) {
        this.sorter.startSort(e.target);
      }
    },

    /**
     * Freeze item
     * @return	void
     * */
    freeze: function(){
      this.$el.addClass(this.pfx + 'opac50');
      this.model.set('open',0);
    },

    /**
     * Unfreeze item
     * @return	void
     * */
    unfreeze: function(){
      this.$el.removeClass(this.pfx + 'opac50');
    },

    /**
     * Update item on status change
     * @param	Event
     * */
    updateStatus: function(e) {
      var status = this.model.get('status');
      var cls = this.pfx + 'selected';
      var el = this.$el;
      switch(status) {
        case 'selected':
          el.addClass(cls);
            break;
        case 'moving':
            break;
        default:
          el.removeClass(cls);
      }
    },

    /**
     * Toggle visibility
     * @param	Event
     *
     * @return 	void
     * */
    toggleVisibility: function(e){
      if(!this.$eye)
        this.$eye = this.$el.find('> #'+this.pfx+'btn-eye');

      var cCss = _.clone(this.model.get('style')),
      hClass = this.pfx + 'hide';
      if(this.isVisible()){
        this.$el.addClass(hClass);
        this.$eye.addClass('fa-eye-slash');
        cCss.display = 'none';
      }else{
        this.$el.removeClass(hClass);
        this.$eye.removeClass('fa-eye-slash');
        delete cCss.display;
      }
      this.model.set('style', cCss);
    },

    /**
     * Check if component is visible
     *
     * @return bool
     * */
    isVisible: function(){
      var css = this.model.get('style'),
        pr = css.display;
      if(pr && pr == 'none' )
        return;
      return 1;
    },

    /**
     * Update item aspect after children changes
     *
     * @return void
     * */
    checkChildren: function(){
      var c = this.countChildren(this.model),
      pfx = this.pfx,
      tC = '> .' + pfx + 'title-c > .' + pfx + 'title';
      if(!this.$counter)
        this.$counter	= this.$el.find('> #' + pfx + 'counter');
      if(c){
        this.$el.find(tC).removeClass(pfx + 'no-chld');
        this.$counter.html(c);
      }else{
        this.$el.find(tC).addClass(pfx + 'no-chld');
        this.$counter.empty();
        this.model.set('open',0);
      }
    },

    /**
     * Count children inside model
     * @param  {Object} model
     * @return {number}
     * @private
     */
    countChildren: function(model){
      var count = 0;
      model.components.each(function(m){
        var isCountable = this.opt.isCountable;
        var hide = this.config.hideTextnode;
        if(isCountable && !isCountable(m, hide))
          return;
        count++;
      }, this);
      return count;
    },

    render: function(){
      var pfx = this.pfx;
      var vis = this.isVisible();
      var count = this.countChildren(this.model);

      this.$el.html( this.template({
        title: this.model.get(this.customNameProp) || this.model.getName(),
        addClass: (count ? '' : pfx+'no-chld'),
        editBtnCls: this.editBtnCls,
        inputNameCls: this.inputNameCls,
        caretCls: this.caretCls,
        count: count,
        visible: vis,
        hidable: this.config.hidable,
        prefix: pfx,
        ppfx: this.ppfx
      }));

      if(typeof ItemsView == 'undefined')
      	ItemsView = require('./ItemsView');
      this.$components = new ItemsView({
        collection 	: this.model.components,
        config: this.config,
        sorter: this.sorter,
        opened: this.opt.opened,
        parent: this.model
      }).render().$el;
      this.$el.find('.'+ pfx +'children').html(this.$components);
      this.$caret = this.$el.find('> .' + pfx + 'title-c > .' + pfx + 'title > #' + pfx + 'caret');
      if(!this.model.get('draggable') || !this.config.sortable){
      	this.$el.find('> #' + pfx + 'move').detach();
      }
      if(!vis)
        this.className += ' ' + pfx + 'hide';
      this.$el.attr('class', _.result(this, 'className'));
      this.updateOpening();
      this.updateStatus();
      return this;
    },

  });
});
