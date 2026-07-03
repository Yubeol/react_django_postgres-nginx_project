import React from 'react'
import { useGetSales } from '../../no3_store/hooks/useSales'
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components'
import { MdBarChart } from 'react-icons/md'

const SalesTable = () => {
    const { rowData, isLoading, error } = useGetSales()

    const columnDefs = [
        { field: 'id', headerName: "주문번호", flex: 1 },
        { field: 'user_name', headerName: "회원명", flex: 1 },
        { field: 'product_name', headerName: "상품명", flex: 1 },
        { field: 'quantity', headerName: "수량", flex: 1 },
        { field: 'discountRate', headerName: "할인율", flex: 1 },
        {
            field: 'totalPrice',
            headerName: "결제금액",
            flex: 1,
            valueFormatter: (params) => params.value?.toLocaleString('ko-KR') + '원'
        },
        { field: 'createdAt', headerName: "주문일자", flex: 1 },
    ]

    return (
        <PageWrapper>
            <TableHeader>
                <HeaderLeft>
                    <PageIcon><MdBarChart size={22} /></PageIcon>
                    <HeaderText>
                        <TableTitle>판매 관리</TableTitle>
                        <SubTitle>판매 내역을 확인하세요 · 총 {rowData?.length ?? 0}건</SubTitle>
                    </HeaderText>
                </HeaderLeft>
            </TableHeader>

            <ContentCard>
                {isLoading && <StatusText>불러오는 중...</StatusText>}
                {error && <StatusText $error>{error.message}</StatusText>}
                {!isLoading && !error && (
                    <GridWrapper className='ag-theme-alpine'>
                        <AgGridReact
                            theme="legacy"
                            rowData={rowData}
                            columnDefs={columnDefs}
                            pagination={true}
                            paginationPageSize={25}
                            paginationPageSizeSelector={false}
                            animateRows={true}
                            getRowId={(params) => params.data.id.toString()}
                        />
                    </GridWrapper>
                )}
            </ContentCard>
        </PageWrapper>
    )
}

export default SalesTable

const PageWrapper = styled.div`
    padding: 4px 0;
`
const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`
const PageIcon = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, #f43f5e, #fb7185);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`
const HeaderText = styled.div``
const TableTitle = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
`
const SubTitle = styled.p`
    font-size: 13px;
    color: #94a3b8;
    margin: 2px 0 0;
`
const ContentCard = styled.div`
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`
const GridWrapper = styled.div`
    height: 640px;
    width: 100%;
`
const StatusText = styled.p`
    text-align: center;
    padding: 60px 0;
    color: ${({ $error }) => $error ? '#ef4444' : '#94a3b8'};
    font-size: 14px;
`