import { LineChart, Line, ResponsiveContainer } from 'recharts';

const EarningsCard = ({
  title = 'Earnings',
  amount = '8,746',
  period = 'September',
  data = [],
}) => {
  return (
    <div className="relative rounded-2xl  bg-bg-surface p-6 overflow-hidden">
      {/* header */}
      <div className="flex items-center gap-4 justify-between mb-6">
        <p className="text-text-muted text-sm">{title}</p>
        <span className="bg-brand-primary/20 text-brand-primary text-xs px-3 py-2 rounded-md">
          {period}
        </span>
      </div>

      {/* amount */}
      <h3 className="text-3xl font-semibold text-text-primary mb-6">
        ${amount}
      </h3>

      {/* chart */}
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height={128} minHeight={128}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Line
              type="monotone"
              dataKey="value"
              stroke="#4ade80"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 7,
                fill: '#0b0e11',
                stroke: '#4ade80',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* glow */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-brand-primary/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default EarningsCard;
