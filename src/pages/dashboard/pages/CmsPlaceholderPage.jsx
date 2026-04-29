import { PageHeader, Panel } from '../components/DashboardUI';

export const CmsPlaceholderPage = ({ module }) => {
  const Icon = module.icon;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Content"
        title={module.title}
        description={module.description}
      />

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.85fr)]">
        <Panel title="Interface preview" icon={<Icon size={18} />}>
          <div className="grid min-w-0 gap-3 md:grid-cols-2">
            {['Draft item', 'Published item', 'Hidden item', 'Featured item'].map((item, index) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-primary/5 bg-bg/70 p-5 transition hover:border-accent/50"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-accent/40 px-3 py-1 text-xs font-bold text-primary">
                    {index % 2 === 0 ? 'Active' : 'Draft'}
                  </span>
                  <Icon size={20} className="text-primary/45" />
                </div>
                <h3 className="break-words font-heading text-3xl uppercase leading-none">{item}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Manage titles, visibility, ordering, and publishing status from this workspace.
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Workspace">
          <div className="space-y-3">
            {['Create new entries', 'Edit published content', 'Reorder display sections', 'Hide or feature selected items'].map((item) => (
              <div key={item} className="rounded-[1rem] border border-primary/5 bg-bg/70 p-4 text-sm font-bold text-primary/75">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[1.25rem] bg-primary p-5 text-bg">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-bg/45">Status</p>
            <p className="mt-3 text-sm leading-relaxed text-bg/70">
              This section is prepared for content management. Controls will become active as content data is connected.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
};
