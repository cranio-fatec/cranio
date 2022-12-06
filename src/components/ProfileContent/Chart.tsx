import React, { useMemo } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import { ProfileChartProps } from './types'
import theme from '../../styles/theme'
import { StyledPieChart } from './styles'

// import { Container } from './styles';

ChartJS.register(ArcElement, Tooltip, Legend)

const ProfileChart: React.FC<ProfileChartProps> = ({ subjectsWithCounts }) => {
	const data = useMemo(() => {
		const chartData = {
			labels: [] as string[],
			datasets: [
				{
					// label: '# of Votes',
					data: [] as number[],
					backgroundColor: [] as string[]
				}
			]
		}

		subjectsWithCounts.forEach((subject) => {
			chartData.labels.push(subject.name)
			chartData.datasets[0].data.push(subject.posts + subject.answers)
			chartData.datasets[0].backgroundColor.push(
				theme.colors.subjects[subject.id as any].text
			)
		})

		return chartData
	}, [subjectsWithCounts])

	return (
		<div style={{ height: 256 }}>
			<StyledPieChart
				data={data}
				options={{
					plugins: { legend: { position: 'right' } },
					maintainAspectRatio: false
				}}
				width="100%"
				// height={256}
			/>
		</div>
	)
}

export default ProfileChart
