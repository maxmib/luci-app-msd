/* Copyright (C) 2022 ImmortalWrt.org */

'use strict';
'require view';
'require form';
'require tools.widgets as widgets';

return view.extend({
	render: function () {
		var m, s, o;

		m = new form.Map('msd_lite', _('Multi Stream daemon Lite'),
			_('The lightweight version of Multi Stream daemon (msd) Program for organizing IPTV streaming on the network via HTTP.'));

		s = m.section(form.TypedSection, 'instance');
		s.anonymous = true;
		s.addremove = true;
		s.addbtntitle = _('Add instance');

		o = s.option(form.Flag, 'enabled', _('Enable'));
		o.default = o.disabled;
		o.rmempty = false;

		o = s.option(form.DynamicList, 'address', _('Bind address'));
		o.datatype = 'ipaddrport(1)';
		o.rmempty = false;

		o = s.option(form.Button, 'view_button', _('后台'));
                o.inputtitle = "测试";
                o.onclick = function(section_id) {
                 var address = '10.0.0.1:1234'; // 将“IP”替换为您手动定义的IP地址
                  //var address = this.section.formvalue(section_id, 'address');
                 window.open('http://' + address + '/stat', '_blank');
                            };

		o = s.option(widgets.DeviceSelect, 'interface', _('Source interface'),
			_('For multicast receive.'));
		o.noaliases = true;
		o.nocreate = true;
		o.optional = true;

		o = s.option(form.Value, 'threads', _('Worker threads'),
			_('Leave 0 or <em>empty</em> to auto detect.'));
		o.datatype = 'uinteger';
		o.default = '0';

		o = s.option(form.Flag, 'bind_to_cpu', _('Bind threads to CPUs'));
		o.default = o.disabled;

		o = s.option(form.Flag, 'drop_slow_clients', _('Disconnect slow clients'));
		o.default = o.disabled;

		o = s.option(form.Value, 'precache_size', _('Pre cache size'));
		o.datatype = 'uinteger';
		o.default = '4096';

		o = s.option(form.Value, 'ring_buffer_size', _('Ring buffer size'),
			_('Stream receive ring buffer size.'));
		o.datatype = 'uinteger';
		o.default = '1024';

		o = s.option(form.Value, 'multicast_recv_buffer_size', _('Receive buffer size'),
			_('Multicast receive socket buffer size.'));
		o.datatype = 'uinteger';
		o.default = '512';

		o = s.option(form.Value, 'multicast_recv_timeout', _('Receive timeout'),
			_('Multicast receive timeout.'));
		o.datatype = 'uinteger';
		o.default = '2';

		o = s.option(form.Value, 'rejoin_time', _('IGMP/MLD rejoin time'),
			_('Do IGMP/MLD leave+join every X seconds. Leave <em>0</em> to disable.'));
		o.datatype = 'uinteger';
		o.default = '0';

		return m.render();
	}
});
