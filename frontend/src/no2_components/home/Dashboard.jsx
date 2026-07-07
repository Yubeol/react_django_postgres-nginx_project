import React from 'react'
import { useDashoard } from '../../no3_store/useHooks/useDashboard';
import styled from 'styled-components'
import {
    DollarOutlined,
    ShoppingCartOutlined,
    InboxOutlined,
    UserOutlined,
    AppstoreOutlined
} from '@ant-design/icons'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js"
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const kpiConfig = [
    {
        key: 'totalSalesAmount',
        title: '총 매출액',
        suffix: '원',
        icon: <DollarOutlined />,
        color: '#6366f1',
        bg: 'linear-gradient(135deg, #6366f1, #818cf8)',
    },
    {
        key: 'totalQuantity',
        title: '총 판매수량',
        suffix: '건',
        icon: <InboxOutlined />,
        color: '#0ea5e9',
        bg: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
    },
    {
        key: 'totalOrderCount',
        title: '총 주문건수',
        suffix: '건',
        icon: <ShoppingCartOutlined />,
        color: '#f59e0b',
        bg: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    },
    {
        key: 'customerCount',
        title: '고객 수',
        suffix: '명',
        icon: <UserOutlined />,
        color: '#8b5cf6',
        bg: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    },
    {
        key: 'productCount',
        title: '상품 수',
        suffix: '개',
        icon: <AppstoreOutlined />,
        color: '#f43f5e',
        bg: 'linear-gradient(135deg, #f43f5e, #fb7185)',
    },
]

const buildChartOptions = (accentColor) => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#0f172a',
            padding: 10,
            cornerRadius: 8,
            titleFont: { size: 12, weight: '600' },
            bodyFont: { size: 12 },
            displayColors: false,
        }
    },
    scales: {
        x: {
            grid: { color: '#f1f5f9' },
            ticks: { color: '#94a3b8', font: { size: 11 } },
            border: { display: false },
        },
        y: {
            grid: { display: false },
            ticks: { color: '#334155', font: { size: 12, weight: '600' } },
            border: { display: false },
        }
    },
    elements: {
        bar: {
            backgroundColor: accentColor,
            borderRadius: 6,
            borderSkipped: false,
        }
    },
    maxBarThickness: 28,
})

const EmptyChart = ({ label }) => (
    <EmptyState>
        <EmptyIcon>—</EmptyIcon>
        <EmptyText>{label}</EmptyText>
    </EmptyState>
)

const Dashboard = () => {
    const { kpi, userRanking, productRanking } = useDashoard();

    const today = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
    })

    const userChartData = {
        labels: userRanking.map(item => item.name),
        datasets: [{ label: "구매 건수", data: userRanking.map(item => item.count) }]
    }

    const productChartData = {
        labels: productRanking.map(item => item.name),
        datasets: [{ label: "판매 수량", data: productRanking.map(item => item.quantity) }]
    }

    return (
        <PageWrapper>
            <PageHeader>
                <HeaderText>
                    <PageTitle>대시보드</PageTitle>
                    <PageSubtitle>오늘의 매출과 운영 현황을 한눈에 확인하세요</PageSubtitle>
                </HeaderText>
                <DateBadge>{today}</DateBadge>
            </PageHeader>

            <KpiGrid>
                {kpiConfig.map(({ key, title, suffix, icon, color, bg }) => (
                    <KpiCard key={key} $accent={color}>
                        <KpiIcon $bg={bg}>{icon}</KpiIcon>
                        <KpiBody>
                            <KpiLabel>{title}</KpiLabel>
                            <KpiValue>
                                {(kpi[key] ?? 0).toLocaleString('ko-KR')}
                                <KpiSuffix>{suffix}</KpiSuffix>
                            </KpiValue>
                        </KpiBody>
                    </KpiCard>
                ))}
            </KpiGrid>

            <ChartGrid>
                <ChartCard>
                    <ChartHeader>
                        <ChartIconChip $color="#6366f1"><UserOutlined /></ChartIconChip>
                        <div>
                            <ChartTitle>고객 구매 랭킹 TOP 10</ChartTitle>
                            <ChartSubtitle>구매 건수가 많은 고객 순</ChartSubtitle>
                        </div>
                    </ChartHeader>
                    <ChartBody>
                        {userRanking.length === 0
                            ? <EmptyChart label="아직 구매 이력이 없습니다" />
                            : <Bar data={userChartData} options={buildChartOptions('#6366f1')} />
                        }
                    </ChartBody>
                </ChartCard>

                <ChartCard>
                    <ChartHeader>
                        <ChartIconChip $color="#0ea5e9"><AppstoreOutlined /></ChartIconChip>
                        <div>
                            <ChartTitle>상품 판매 랭킹 TOP 10</ChartTitle>
                            <ChartSubtitle>판매 수량이 많은 상품 순</ChartSubtitle>
                        </div>
                    </ChartHeader>
                    <ChartBody>
                        {productRanking.length === 0
                            ? <EmptyChart label="아직 판매 이력이 없습니다" />
                            : <Bar data={productChartData} options={buildChartOptions('#0ea5e9')} />
                        }
                    </ChartBody>
                </ChartCard>
            </ChartGrid>
        </PageWrapper>
    )
}

export default Dashboard

const PageWrapper = styled.div`
    padding: 32px 36px 48px;
    min-height: 100vh;
    background:
        radial-gradient(1200px 400px at 100% -10%, rgba(99,102,241,0.06), transparent),
        #f8fafc;
`
const PageHeader = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 28px;
`
const HeaderText = styled.div``
const PageTitle = styled.h1`
    font-size: 24px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 4px;
    letter-spacing: -0.4px;
`
const PageSubtitle = styled.p`
    font-size: 13px;
    color: #94a3b8;
    margin: 0;
`
const DateBadge = styled.div`
    padding: 7px 14px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
`
const KpiGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    margin-bottom: 24px;

    @media (max-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
    @media (max-width: 640px) { grid-template-columns: repeat(2, 1fr); }
`
const KpiCard = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 18px 20px;
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.15s;

    &::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: ${({ $accent }) => $accent};
    }
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(15,23,42,0.08);
    }
`
const KpiIcon = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: ${({ $bg }) => $bg};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    flex-shrink: 0;
`
const KpiBody = styled.div`
    min-width: 0;
`
const KpiLabel = styled.p`
    font-size: 12px;
    font-weight: 600;
    color: #94a3b8;
    margin: 0 0 4px;
`
const KpiValue = styled.p`
    font-size: 21px;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.3px;
`
const KpiSuffix = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    margin-left: 3px;
`
const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 900px) { grid-template-columns: 1fr; }
`
const ChartCard = styled.div`
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 22px 24px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`
const ChartHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
`
const ChartIconChip = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: ${({ $color }) => `${$color}1a`};
    color: ${({ $color }) => $color};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
`
const ChartTitle = styled.h3`
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
`
const ChartSubtitle = styled.p`
    font-size: 12px;
    color: #94a3b8;
    margin: 2px 0 0;
`
const ChartBody = styled.div`
    height: 300px;
`
const EmptyState = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
`
const EmptyIcon = styled.div`
    font-size: 20px;
    color: #cbd5e1;
`
const EmptyText = styled.p`
    font-size: 13px;
    color: #94a3b8;
    margin: 0;
`