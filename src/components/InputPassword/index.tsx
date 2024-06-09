import { Button } from "@components/Button";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Input, IInputProps } from "@components/Input";
import { useState } from "react";

interface IInputPasswordProps extends IInputProps {}

export function InputPassword(props: IInputPasswordProps) {
	const [visible, setVisible] = useState(false);

	function handleVisible() {
		setVisible(!visible);
	}

	return (
		<Input
			type="password"
			secureTextEntry={!visible}
			InputRightElement={
				<Button pr={2} bg="white" onPress={handleVisible}>
					{visible ? (
						<Ionicons name="eye-off-outline" size={24} color="black" />
					) : (
						<AntDesign name="eyeo" size={24} color="black" />
					)}
				</Button>
			}
			bgColor="white"
			{...props}
		/>
	);
}
