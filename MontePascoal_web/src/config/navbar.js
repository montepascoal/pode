export const itens = [
  {
    label: 'Empresas',
    icon: 'FaBuilding',
    link: '/companies',
    items: [
      {label: 'Listagem', link: '/companies'},
      {label: 'Adicionar', link: 'companies/create'},
    ]
  },
  {
    label: 'Depto. Acadêmico',
    icon: 'FaBookReader',
    link: '/academico',
    items: [
      {label: 'Depto. Acadêmico soma',  link: 'academico/soma'},
      {label: 'Depto. Acadêmico valor', link: 'academico/valor'},
      {label: 'Depto. Acadêmico total', link: 'academico/total'},
      {label: 'Depto. Acadêmico sub',   link: 'academico/sub'},
    ]
  },
  {
    label: 'Depto. de Marketing',
    icon: 'FaPhotoVideo',
    link: '/marketing',
    items: [
      {label: 'Depto. Marketing soma',  link: 'marketing/soma'},
      {label: 'Depto. Marketing valor', link: 'marketing/valor'},
      {label: 'Depto. Marketing total', link: 'marketing/total'},
      {label: 'Depto. Marketing sub',   link: 'marketing/sub'},
    ]
  },
  {
    label: 'Depto. Financeiro',
    icon: 'FaDollarSign',
    link: '/financeiro',
    items: [
      {label: 'Depto. Financeiro soma',  link: 'financeiro/soma'},
      {label: 'Depto. Financeiro valor', link: 'financeiro/valor'},
      {label: 'Depto. Financeiro total', link: 'financeiro/total'},
      {label: 'Depto. Financeiro sub',   link: 'financeiro/sub'},
    ]
  },
  { 
    label: 'Depto. Cobrança',
    icon: 'FaCommentDollar',
    link: '/cobranca',
    items: [
      {label: 'Depto. Cobrança soma',  link: 'cobranca/soma'},
      {label: 'Depto. Cobrança valor', link: 'cobranca/valor'},
      {label: 'Depto. Cobrança total', link: 'cobranca/total'},
      {label: 'Depto. Cobrança sub',   link: 'cobranca/sub'},
    ]
  },
  {
    label: 'Páginas',
    icon: 'FaFolderPlus',
    link: '/pages',
    items: []
  },
  {
    label: 'Logout',
    icon: 'FaPowerOff',
    link: '/logout',
    items: []
  }
]