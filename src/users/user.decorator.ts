import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { GqlExecutionContext, Context, Args } from "@nestjs/graphql";
import { use } from "passport";

export const CurrentUser = createParamDecorator((data, req) =>{
  console.log('damnn',req.root,1, req.args.user,21, req.ctx,2121, req.info);
  
});
