import { Card, Metric, Text, Icon, Flex, Grid } from "@tremor/react";

import { CashIcon, TicketIcon, UserGroupIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";


export default function KpiCards() {
    const {sales, purchases} = useSelector(state => state.stock)
    const totalSales = sales?.reduce((acc, item) => acc + Number(item.price_total), 0)
    const totalPurchases = purchases?.reduce((acc, item) => acc + Number(item.price_total), 0)
    const totalProfit = totalSales - totalPurchases;

    console.log(totalPurchases);
    console.log(totalSales);
    console.log(totalProfit);

    const categories = [
        {
          title: "Sales",
          metric: `${totalSales}`,
          icon: TicketIcon,
          color: "indigo",
        },
        {
          title: "Profit",
          metric: `${totalProfit}`,
          icon: CashIcon,
          color: "fuchsia",
        },
        {
          title: "Purchases",
          metric: `${totalPurchases}`,
          icon: UserGroupIcon,
          color: "amber",
        },
      ];
      
  return (
    <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
      {categories.map((item) => (
        <Card key={item.title} decoration="top" decorationColor={item.color}>
          <Flex justifyContent="start" className="space-x-4">
            <Icon icon={item.icon} variant="light" size="xl" color={item.color} />
            <div className="truncate">
              <Text>{item.title}</Text>
              <Metric className="truncate">{item.metric}</Metric>
            </div>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
}