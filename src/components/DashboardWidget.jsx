const DashboardWidget = ({ title, value, description, icon, color = '#4f46e5' }) => {
  return (
    <div className="dashboard-widget">
      <div className="widget-header">
        <div>
          <h3 className="widget-title">{title}</h3>
        </div>
        <div
          className="widget-icon"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          {icon}
        </div>
      </div>
      <div className="widget-value">{value}</div>
      {description && <p className="widget-description">{description}</p>}
    </div>
  );
};

export default DashboardWidget;
