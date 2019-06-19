/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class WuZiLeiBieDao extends BaseDao {

    public boolean existWuZiLeiBie(Integer qy_id, Integer id, String mc) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        String sql = "";
        if (id > -1) {
            sql = "select 1 from wuzileibie where qy_id=? and id!=? and mc ='?'";
            parameters.add(id);
            parameters.add(mc);
        } else {
            sql = "select 1 from wuzileibie where qy_id=? and mc ='?'";
            parameters.add(mc);
        }
        List list = this.getSqlResult(sql, parameters.toArray());
        return !list.isEmpty();
    }
}
