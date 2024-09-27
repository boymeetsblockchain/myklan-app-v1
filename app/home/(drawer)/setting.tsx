import { View, Text } from "react-native";
import { SafeViewComponent } from "../../../components/safeview";
import { TextWrapperWhite } from "../../../components/textwrapper";

export default function Dashboard() {
  return (
    <SafeViewComponent>
      <TextWrapperWhite>Dashboard</TextWrapperWhite>
    </SafeViewComponent>
  );
}
