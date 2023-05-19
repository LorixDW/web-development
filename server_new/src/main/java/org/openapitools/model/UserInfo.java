package org.openapitools.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * UserInfo
 */

@JsonTypeName("userInfo")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2023-05-19T18:59:56.083+03:00[Europe/Moscow]")
public class UserInfo {

  @JsonProperty("appid")
  private String appid;

  public UserInfo appid(String appid) {
    this.appid = appid;
    return this;
  }

  /**
   * Get appid
   * @return appid
  */
  
  @Schema(name = "appid", example = "0", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public String getAppid() {
    return appid;
  }

  public void setAppid(String appid) {
    this.appid = appid;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    UserInfo userInfo = (UserInfo) o;
    return Objects.equals(this.appid, userInfo.appid);
  }

  @Override
  public int hashCode() {
    return Objects.hash(appid);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class UserInfo {\n");
    sb.append("    appid: ").append(toIndentedString(appid)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

