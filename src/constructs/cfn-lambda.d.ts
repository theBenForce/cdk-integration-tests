declare module "cfn-lambda" {

    interface Result<Attributes> {
        PhysicalResourceId?: string;
        FnGetAttrsDataObj: Attributes;
    }

    interface RequestParameters<Properties> {
        RequestType: "Create" | "Update" | "Delete";
        StackId: string;
        RequestId: string;
        LogicalResourceId: string;
        ResourceProperties: Properties;
    }

    interface CfnLambdaParams<Properties, Attributes> {
        AsyncCreate?: (properties: Properties) => Promise<Result<Attributes>>;
        AsyncUpdate?: (RequestPhysicalID: string, properties: Properties, oldProperties: Properties) => Promise<Result<Attributes>>;
        AsyncDelete?: (RequestPhysicalID: string, properties: Properties) => Promise<Result<Attributes>>;
    }


    export default function CfnLambdaFactory<Properties = Record<string, unknown>, Attributes = Record<string, unknown>>(params: CfnLambdaParams<Properties, Attributes>): Function;
}