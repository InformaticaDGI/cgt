import Card from "../../components/Card/Card";
import IndicatorProgress from "../../components/Indicator/IndicatorProgress";
import { Flex } from "../../components/Layout/Flex";
import Text from "../../components/Ui/Text/Text";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import IndicatorIcon from "../../components/Prebuilt/IndicatorIcon";
import { Trophy } from "lucide-react";
import { Link } from "react-router";
import type { ReactNode } from "react";

const CardLink = ({ to, children }: { to: string; children: ReactNode }) => {
  if (to === "") return <Card>{children}</Card>;
  return (
    <Card as={Link} to={to} $isSelectable={true}>
      {children}
    </Card>
  );
};

const CardIndicatorACA = ({
  to = "",
  title,
  count,
  progress,
  info,
}: {
  to?: string;
  title: string;
  count: number;
  progress: number;
  info?: string;
}) => {
  return (
    <CardLink to={to}>
      <CardHeader>
        <Text
          style={{
            fontSize: "14px",
            color: "#0C777C",
            fontWeight: "700",
            textWrap: "nowrap",
          }}
        >
          {title}
        </Text>
        <Flex $direction="row" $justify="end" $align="center" $gap="8px">
          <Text
            style={{
              fontSize: "14px",
              color: "#889C9D",
              fontWeight: "normal",
              textWrap: "nowrap",
            }}
          >{`${count} Proyectos ACA`}</Text>
          {to !== "" && <IndicatorIcon $isOpen={false} />}
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex $align="stretch" $direction="column" $gap={"8px"}>
          <Flex $align="stretch" $direction="column" $gap={"4px"}>
            <Flex
              $align="center"
              $justify="center"
              $direction="column"
              $gap={"8px"}
            >
              <IndicatorProgress value={progress} size={130} strokeWidth={8} />
              <Flex
                $align="center"
                $justify="center"
                $direction="column"
                $gap={"4px"}
              >
                <Trophy size={20} color="var(--text-secondary)" />
                <Text
                  style={{
                    color: "#7A8E8B",
                    fontSize: "11px",
                    fontWeight: "600",
                    textAlign: "justify",
                  }}
                >
                  Proyectos ACA abordados
                </Text>
              </Flex>
            </Flex>
            <Text
              style={{
                fontSize: "11px",
                color: "#7A8E8B",
                fontWeight: "600",
                textAlign: "justify",
                marginTop: ".7rem",
              }}
            >
              {info || "Sin Datos"}
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </CardLink>
  );
};

export default CardIndicatorACA;
